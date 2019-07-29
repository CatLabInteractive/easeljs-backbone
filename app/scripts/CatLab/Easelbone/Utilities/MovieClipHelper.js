define(
    [
        'easeljs',
        'CatLab/Easelbone/EaselJS/DisplayObjects/Placeholder'
    ],
    function(
        createjs,
        Placeholder
    ) {
        "use strict";

        var MovieClipHelper = function() {

        };

        var p = MovieClipHelper.prototype;

        /**
         * Find elements by name and turn them into placeholders.
         * Returns an array with all placeholders.
         * @param {string|array} name
         * @param container
         * @returns {Array}
         */
        p.findPlaceholders = function (name, container) {
            var out = [];
            var placeholders = this.findFromNames(name, container);
            placeholders.forEach(function (element) {
                out.push(new Placeholder(element));
            });
            return out;
        };

        /**
         * Find all named elements (generated by adobe animate) in the container
         * or its children (for named elements), with dot notation support and fallback
         * to deprecated/alternative names when providing an array.
         * @param {string|Array} names
         * @param containers
         * @param {{ all: boolean }} options
         * @returns {Array}
         */
        p.findFromNames = function (names, containers, options) {

            if (!Array.isArray(containers)) {
                containers = [containers];
            }

            if (!Array.isArray(names)) {
                names = [names];
            }

            var results = [];
            var name;
            var nameParts;
            var rootName;

            // Loop through the names and return the first resultset with matches
            for (var i = 0; i < names.length; i ++) {

                name = names[i];

                // Check for dot notation
                nameParts = name.split('.');
                rootName = nameParts.shift();

                // Go through all containers
                containers.forEach(function (container) {
                    results = results.concat(this.findFromNameInContainer(container, rootName, options));

                    // Do we need to go further down the rabbithole?
                    if (nameParts.length > 0) {
                        results = this.findFromNames(nameParts.join('.'), results);
                    }
                }.bind(this));

                if (results.length > 0) {
                    return results;
                }
            }

            return results;
        };

        /**
         * Find all named elements (generated by adobe animate) in the container
         * and all child named elements and return them.
         * @param container
         * @param name
         * @param {{ all: boolean }} options
         * @param results
         * @returns {Array}
         */
        p.findFromNameInContainer = function (container, name, options, results) {
            if (typeof (results) === 'undefined') {
                results = [];
            }

            if (typeof (options) === 'undefined') {
                options = {};
            }

            if (container[name] instanceof createjs.DisplayObject) {
                results.push(container[name]);
            }

            if (options.all && results.length === 0) {
                this.forEachNamedChild(container, function (child) {
                    this.findFromNameInContainer(child, name, options, results);
                }.bind(this));
            }

            return results;
        };

        /**
         * Loop through all named children
         * @param container
         * @param callback
         */
        p.forEachNamedChild = function(container, callback)
        {
            // Look for named properties (defined by adobe animate)
            for (var key in container) {

                if (!container.hasOwnProperty(key)) {
                    continue;
                }

                switch (key) {
                    case 'parent':
                    case 'mask':
                        continue;
                }

                if (container[key] instanceof createjs.DisplayObject) {
                    if (callback(container[key], key, container) === false) {
                        return;
                    }
                }
            }
        };

        p.forAllNamedChildren = function(container, callback)
        {
            this.forEachNamedChild(container, function(child, name) {

                callback(child, name, container);
                this.forAllNamedChildren(child, callback);

            }.bind(this));
        };

        /**
         * Apply spritesheet filters and cache their result
         * @param filters
         * @param container
         */
        p.applySpriteFilters = function(filters, container)
        {
            this.forAllNamedChildren(container, function(child, name, parent) {

                if (!(child instanceof createjs.Sprite)) {
                    return;
                }

                var bounds = child.getBounds();
                child.filters = filters;
                child.cache(0, 0, bounds.width, bounds.height);

            }.bind(this));
        };

        /**
         * Attach helper methods to the createjs MovieClip prototype
         */
        p.attach = function(createjs) {
            var helper = this;

            var p = createjs.MovieClip.prototype;

            p.forEachNamedChild = function(callback) {
                return helper.forEachNamedChild(this, callback);
            };

            p.findNamedChildren = function(names) {
                return helper.findFromNames(names, this);
            };

            p.findPlaceholders = function(names) {
                return helper.findPlaceholders(names, this);
            };

            p.applySpriteFilters = function(filters) {
                return helper.applySpriteFilters(filters, this);
            };
        };

        return new MovieClipHelper();

    }
);