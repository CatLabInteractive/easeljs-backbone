define (
	[
		'CatLab/Easelbone/Controls/Base'
	],
	function (
		Base
	) {

		var Checkbox = function (element) {

			var self = this;

			this.element = element;

			// Listen to click event
			this.element.addEventListener ('click', function () {
				self.toggle ();
			});

		};

		// Extend base.
		Checkbox.prototype = new Base ();

		Checkbox.prototype.toggle = function () {
			this.checked = !this.checked;
			this.update ();
		};

		Checkbox.prototype.keyInput = function (input) {

			switch (input) {
				case 'a':

					this.toggle ();

				break;
			}

		};

		return Checkbox;

	}
);