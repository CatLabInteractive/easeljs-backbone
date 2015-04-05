/*
 * ButtonHelper
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

define("CatLab/Easelbone/Utilities/Loader",["PreloadJS"],function(e){var t=function(){this.loader=new createjs.LoadQueue(!1)};return t.prototype.loadAssets=function(e,t){this.loader.loadManifest(e.properties.manifest,!0,t)},t.prototype.load=function(e){e()},t}),define("CatLab/Easelbone/Views/Layer",["EaselJS"],function(e){var t=function(){this.container=new e.Container,this.view=null};return t.prototype.setView=function(t){this.view!=null&&this.view.trigger("stage:removed"),this.view=t,this.container.removeAllChildren();var n=new e.Container;this.view.setElement(n),this.container.addChild(n),this.view.trigger("stage:added")},t.prototype.render=function(){if(!this.view)return;this.view.el.removeAllChildren(),this.view.trigger("render:before"),this.view.render(),this.view.trigger("render"),this.view.trigger("render:after")},t.prototype.tick=function(e){return!1},t}),define("CatLab/Easelbone/Views/Root",["backbone","EaselJS","CatLab/Easelbone/Views/Layer"],function(e,t,n){var r,i,s=!1;return e.View.extend({stage:null,container:null,hudcontainer:null,view:null,hud:null,initialize:function(e){var n=this;if(typeof e.canvas!="undefined")this.canvas=e.canvas,this.container=this.canvas.parentNode;else{if(typeof e.container=="undefined")throw new Error("Container must be defined for root view.");this.canvas=document.createElement("canvas"),this.container=e.container,this.container.appendChild(this.canvas)}this.stage=new t.Stage(this.canvas),this.layers=[],this.layerMap={},this.mainLayer=this.nextLayer("main"),t.Ticker.addEventListener("tick",function(e){n.tick(e)}),t.Ticker.addEventListener("tick",this.stage),this.resize()},nextLayer:function(e){typeof e=="undefined"&&(e="Layer"+this.layers.length);var t=new n;return this.stage.addChild(t.container),this.layers.push(t),this.layerMap[e]=t,t},getLayer:function(e){return this.layerMap[e]},setView:function(e){this.mainLayer.setView(e),this.render()},tick:function(e){this.trigger("tick:before",e),s=!1;for(r=0;r<this.layers.length;r++)i=this.layers[r],i.tick(e)&&(s=!0);s&&this.update(),this.trigger("tick:after")},render:function(){for(r=0;r<this.layers.length;r++)this.layers[r].render();return this.update(),this},update:function(){this.stage.update()},fullscreen:function(){this.resizeFullscreen()},resize:function(){typeof this.container!="undefined"?(this.canvas.width=this.container.offsetWidth,this.canvas.height=this.container.offsetHeight):(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight),this.render()}})}),define("CatLab/Easelbone/Utilities/GlobalProperties",["backbone"],function(e){var t=e.Model.extend({initialize:function(){this.set({width:800,height:600,font:"sans-serif",textColor:"white"})},getWidth:function(){return this.get("width")},getHeight:function(){return this.get("height")},getDefaultFont:function(){return this.get("font")},getDefaultTextColor:function(){return this.get("textColor")},ifUndefined:function(e,t){return typeof e!="undefined"&&e!==null?e:t}});return new t}),define("CatLab/Easelbone/Views/Base",["backbone","CatLab/Easelbone/Utilities/GlobalProperties"],function(e,t){return e.View.extend({el:"div",setRootView:function(e){this.set("root",e)},getWidth:function(){return this.el.getStage().canvas.width},getHeight:function(){return this.el.getStage().canvas.height},scale:function(e){var t=this.getScale();e.scaleX=t.x,e.scaleY=t.y},getScale:function(e,n,r){if(typeof e=="undefined"||e===null)e=t.getWidth();if(typeof n=="undefined"||n===null)n=t.getHeight();typeof r=="undefined"&&(r=!1);var i=this.getWidth()/e,s=this.getHeight()/n,o=r?Math.max(i,s):Math.min(i,s);return{x:o,y:o}},addCenter:function(e,n,r,i,s){if(typeof n=="undefined"||n===null)n=t.getWidth();if(typeof r=="undefined"||r===null)r=t.getHeight();if(typeof s=="undefined"||s===null)s=1;var o=this.getScale(n,r,i);o.x=o.x*s,o.y=o.y*s,e.x=(this.getWidth()-n*o.x)/2,e.y=(this.getHeight()-r*o.y)/2,e.scaleX=o.x,e.scaleY=o.y,this.el.addChild(e);var u=new createjs.Graphics;e.x>0&&(u.beginFill(this.getBackground()).drawRect(0,0,Math.ceil(e.x),this.getHeight()),u.beginFill(this.getBackground()).drawRect(this.getWidth()-Math.ceil(e.x),0,Math.ceil(e.x),this.getHeight())),e.y>0&&(u.beginFill(this.getBackground()).drawRect(0,0,this.getWidth(),Math.ceil(e.y)),u.beginFill(this.getBackground()).drawRect(0,this.getHeight()-Math.ceil(e.y),this.getWidth(),Math.ceil(e.y)));var a=new createjs.Shape(u);this.el.addChild(a)},clear:function(){this.el.removeAllChildren();var e=new createjs.Graphics;e.beginFill(this.getBackground()).drawRect(0,0,this.getWidth(),this.getHeight());var t=new createjs.Shape(e);this.el.addChild(t)},getBackground:function(){return"#000000"},render:function(){var e=new createjs.Container;e.setBounds(0,0,this.getWidth(),this.getHeight());var t=new createjs.BigText("Please wait, initializing application","Arial","#000000");e.addChild(t),this.el.addChild(e)},tick:function(){return!1},afterRender:function(){},onRemove:function(){}})}),define("CatLab/Easelbone/Views/Navigatable",["CatLab/Easelbone/Views/Base"],function(e){return e.extend({_users:[],_currentIndex:-1,_current:null,_options:[],_controls:{navigation:["left","right"],toggle:["a"],manipulation:["down","up"]},initialize:function(e){this.initializeNavigatable(e)},initializeNavigatable:function(e){e=e||{},typeof e.orientation!="undefined"&&e.orientation=="vertical"&&(this._controls.navigation=["up","down"],this._controls.manipulation=["left","right"]),this.resetOptions()},setUsers:function(e){this._users=e;var t=this;for(var n=0;n<this._users.length;n++){var r=this._users[n];r.setView("catlab-nes"),r.clearEvents(),r.control(this._controls.navigation[0]).click(function(){t.previous()}),r.control(this._controls.navigation[1]).click(function(){t.next()}),r.control(this._controls.toggle).click(function(){t.keyInput("a")}),r.control(this._controls.toggle).click(function(){t.keyInput("b")}),r.control(this._controls.manipulation[0]).click(function(){t.keyInput("down")}),r.control(this._controls.manipulation[1]).click(function(){t.keyInput("up")})}},next:function(){this.activate((this._currentIndex+1)%this._options.length)},previous:function(){var e=this._currentIndex-1;e<0&&(e=this._options.length-1),this.activate(e)},keyInput:function(e){this._current&&this._current.keyInput(e)},resetOptions:function(){this._options=[]},addControl:function(e){var t=this;this._options.push(e),e.deactivate(!1)},activate:function(e){this._currentIndex!==-1&&this._currentIndex!==null&&this._options[this._currentIndex].deactivate(),this._currentIndex=e,this._options[e].activate(),this._current=this._options[e]}})}),define("CatLab/Easelbone/Controls/Base",["underscore","backbone"],function(e,t){var n=function(){this.checked=!1,this.active=!1,e.extend(this,t.Events)};return n.prototype.activate=function(e){this.active=!0,this.update(e)},n.prototype.deactivate=function(e){this.active=!1,this.update(e)},n.prototype.update=function(e){typeof e=="undefined"&&(e=!0),this.active?this.checked?this.gotoWithAnimate("Hit",e):this.gotoWithAnimate("Over",e):this.checked?this.gotoWithAnimate("Down",e):this.gotoWithAnimate("Up",e)},n.prototype.gotoWithAnimate=function(e,t){if(!t&&this.element.timeline.resolve(e+"-NoAnim")){this.element.gotoAndPlay(e+"-NoAnim");return}this.element.gotoAndPlay(e)},n}),define("CatLab/Easelbone/Utilities/Path",[],function(){var e,t,n=function(e,t){this.start={x:e.x,y:e.y},this.end={x:t.x,y:t.y},this.distance={x:t.x-e.x,y:t.y-e.y},this.orientation=this.distance.x>this.distance.y?"horizontal":"vertical",this.indicatorSize={x:0,y:0}};return n.prototype.getPosition=function(e){return{x:this.start.x+(this.distance.x-this.indicatorSize.x)*e,y:this.start.y+(this.distance.y-this.indicatorSize.y)*e}},n.prototype.getValue=function(n,r){return this.orientation==="horizontal"?e=(n-this.start.x)/this.distance.x:e=(r-this.start.y)/this.distance.y,t=Math.max(0,Math.min(1,e)),t},n.prototype.position=function(e,t){var n=this.getPosition(t);e.x=n.x,e.y=n.y},n.prototype.setIndicatorSize=function(e,t){this.indicatorSize={x:e,y:t}},n}),define("CatLab/Easelbone/Controls/Slider",["CatLab/Easelbone/Controls/Base","CatLab/Easelbone/Utilities/Path"],function(e,t){var n=function(e){var n=this,r;this.element=e,this.step=.1,this.path=new t(this.element.minimum,this.element.maximum),this.setValue(.5),this.element.pointer.on("pressmove",function(e){r=n.element.globalToLocal(e.stageX,e.stageY),n.setValue(n.path.getValue(r.x,r.y))}),this.element.pointer.on("click",function(e){e.stopPropagation()}),this.element.on("click",function(e){r=n.element.globalToLocal(e.stageX,e.stageY),n.setValue(n.path.getValue(r.x,r.y))})};return n.prototype=new e,n.prototype.link=function(e,t){return this.setValue(e.get(t)),this},n.prototype.setValue=function(e){this.value=e,this.path.position(this.element.pointer,this.value)},n.prototype.keyInput=function(e){console.log(e);switch(e){case"up":this.value=Math.min(1,this.value+this.step);break;case"down":this.value=Math.max(0,this.value-this.step)}this.setValue(this.value)},n}),define("CatLab/Easelbone/Controls/Checkbox",["CatLab/Easelbone/Controls/Base"],function(e){var t=function(e){var t=this;this.element=e,this.element.addEventListener("click",function(){t.toggle()})};return t.prototype=new e,t.prototype.toggle=function(){this.checked=!this.checked,this.update()},t.prototype.check=function(){this.checked=!0,this.update()},t.prototype.uncheck=function(){this.checked=!1,this.update()},t.prototype.keyInput=function(e){switch(e){case"a":this.toggle()}},t}),define("CatLab/Easelbone/EaselJS/DisplayObjects/BigText",["EaselJS","CatLab/Easelbone/Utilities/GlobalProperties"],function(e,t){var n,r,i=!1,s,o=!1,u=function(e,n,r){this.textstring=e,this.font=t.ifUndefined(n,t.getDefaultFont()),this.color=t.ifUndefined(r,t.getDefaultTextColor()),this.initialize(),this.initialized=!1,this.limits=null,this.debug=i},a=u.prototype=new e.Container;return a.Container_initialize=a.initialize,a.initialize=function(){this.Container_initialize()},a.isVisible=function(){return!0},a.setText=function(e){this.initialized=!1,this.textstring=e},a.setLimits=function(e,t){this.limits={width:e,height:t}},a.getAvailableSpace=function(){return this.limits!==null?this.limits:(this.parent?(n=this.parent.getBounds().width,r=this.parent.getBounds().height):this.getBounds()?(n=this.getBounds().width,r=this.getBounds().height):(n=100,r=100),{width:n,height:r})},a.goBigOrGoHome=function(t,n,r){function a(){u--;if(u<0)return!1;var a=new e.Text(t,s+"px "+i.font,i.color);return a.lineWidth=n,a.getBounds().height<r&&a.getBounds().width<=n?(o=a,s++,!0):!1}var i=this,s=10,o=new e.Text(""+String(t),s+"px "+this.font,this.color),u=500;while(a());return o},a.Container_draw=a.draw,a.getLocationHash=function(){return s=this.getAvailableSpace(),s.width+":"+s.height},a.hasChanged=function(){return s=this.getLocationHash(),o=this.lastHash!=s,this.lastHash=s,o},a.draw=function(t,n){if(this.initialized&&!this.hasChanged())return this.Container_draw(t,n);this.initialized=!0,this.removeAllChildren();var r=this.getAvailableSpace();if(i){var s=new e.Shape;s.graphics.beginStroke("#FFA500"),s.graphics.setStrokeStyle(1),s.snapToPixel=!0,s.graphics.drawRect(0,0,r.width,r.height),this.addChild(s)}var o=this.goBigOrGoHome(this.textstring,r.width,r.height);return o.textAlign="center",o.x=(r.width-o.getBounds().width)/2+o.getBounds().width/2,o.y=(r.height-o.getBounds().height)/2,this.addChild(o),this.Container_draw(t,n)},e.BigText=u,u}),define("CatLab/Easelbone/EaselJS/DisplayObjects/Placeholder",["EaselJS"],function(e){var t=function(e){typeof e!="undefined"&&(this.initialize(),this.initializePlaceholder(e))},n=t.prototype=new e.Container;return n.initializePlaceholder=function(t){var n=this,r="0:0",i="0:0",s;t.original_draw=t.draw,t.draw=function(e,n){return this.updateBounds(),t.original_draw(e,n)},this.getBoundsHash=function(){return r=this.getBounds().width+":"+this.getBounds().height,r},this.hasBoundsChanged=function(){if(this.getBoundsHash()!=i)return i=r,!0},t.updateBounds=function(){n.setBounds(0,0,Math.ceil(this.scaleX*100),Math.ceil(this.scaleY*100)),n.x=this.x,n.y=this.y,n.rotation=this.rotation,n.hasBoundsChanged()&&(s=new e.Event("bounds:change"),n.dispatchEvent(s))};for(var o=0;o<t.children.length;o++)t.children[o].visible=!1;t.parent!=null?(t.parent.addChild(n),n.dispatchEvent("initialized")):t.addEventListener("added",function(){t.parent.addChild(n),n.dispatchEvent("initialized")})},t}),define("CatLab/Easelbone/EaselJS/DisplayObjects/TextPlaceholder",["CatLab/Easelbone/EaselJS/DisplayObjects/Placeholder"],function(e){return e}),define("CatLab/Easelbone/Controls/Button",["CatLab/Easelbone/Controls/Base","CatLab/Easelbone/EaselJS/DisplayObjects/BigText","CatLab/Easelbone/EaselJS/DisplayObjects/TextPlaceholder"],function(e,t,n){var r=function(e){var t=this;this.element=e,this.checked=!1;if(!this.element.text)throw"All buttons should have a text placeholder.";this.convertText(),this.element.addEventListener("click",function(){t.trigger("click")})};return r.prototype=new e,r.prototype.setText=function(e,n,r){var i=new t(e,n,r);this.text.addChild(i)},r.prototype.convertText=function(){this.text=new n(this.element.text)},r.prototype.keyInput=function(e){switch(e){case"a":this.trigger("click")}},r}),define("CatLab/Easelbone/Controls/Selectbox",["CatLab/Easelbone/Controls/Base","CatLab/Easelbone/EaselJS/DisplayObjects/BigText","CatLab/Easelbone/EaselJS/DisplayObjects/TextPlaceholder"],function(e,t,n){var r=function(e){var n=this;this.element=e,this.checked=!1,this.repeat=!1,this.textcontainer=t,this.index=0,this.value=null,this.values=[];if(!this.element.value)throw"All selectboxes should have a text placeholder.";if(!this.element.buttons)throw"All selectboxes must have a buttons object";this.element.buttons.on("click",function(e){var t=n.element.buttons.globalToLocal(e.stageX,e.stageY);t.y>40?n.previous():n.next()}),this.convertText()};return r.prototype=new e,r.prototype.setText=function(e,t,n){var r=new this.textcontainer(e,t,n);this.text.removeAllChildren(),this.text.addChild(r)},r.prototype.convertText=function(){this.text=new n(this.element.value)},r.prototype.setValues=function(e){if(e instanceof Array){var t=[];for(var n=0;n<e.length;n++)t.push({text:e[n],value:e[n]});e=t}this.values=e,this.select(0)},r.prototype.getValue=function(){return this.value},r.prototype.select=function(e){if(e<0||e>this.values.length-1)return;this.index=e,this.value=this.values[this.index],this.setText(this.value.text)},r.prototype.next=function(){this.index<this.values.length-1?this.select(this.index+1):this.repeat&&this.select(0)},r.prototype.previous=function(){this.index>0?this.select(this.index-1):this.repeat&&this.select(this.values.length-1)},r.prototype.keyInput=function(e){switch(e){case"up":this.next();break;case"down":this.previous()}},r}),define("CatLab/Easelbone/Controls/ScrollBar",["underscore","CatLab/Easelbone/Utilities/Path"],function(e,t){var n=function(e){var n=this;this.element=e,this.element.up.on("click",this.up,this),this.element.down.on("click",this.down,this),this.path=new t(this.element.minimum,this.element.maximum),this.containers=[],this.element.on("pressmove",function(e){s=n.element.globalToLocal(e.stageX,e.stageY),n.scrollTo(n.path.getValue(s.x,s.y))})},r=n.prototype,i,s;return r.link=function(e){this.containers.push(e),e.on("scroll",this.onScroll,this)},r.up=function(){e.each(this.containers,function(e){e.up()})},r.down=function(){e.each(this.containers,function(e){e.down()})},r.getIndicatorSize=function(){return this.element.indicator.bottom&&this.element.indicator.top?s={x:(this.element.indicator.bottom.x-this.element.indicator.top.x)*this.element.indicator.scaleX,y:(this.element.indicator.bottom.y-this.element.indicator.top.y)*this.element.indicator.scaleY}:s={x:0,y:0},s},r.scrollTo=function(t){e.each(this.containers,function(e){e.scrollTo(t)})},r.onScroll=function(e){i=Math.min(1,e.containerHeight/e.contentHeight),s=this.getIndicatorSize(),this.path.setIndicatorSize(s.x,s.y),this.path.position(this.element.indicator,e.percentage)},n}),define("CatLab/Easelbone/EaselJS/DisplayObjects/ScrollArea",["EaselJS","CatLab/Easelbone/EaselJS/DisplayObjects/Placeholder"],function(e,t){var n=function(n){var r=this;this.initialize();var i=new t(n);i.on("bounds:change",function(){var t=new e.Shape;t.graphics.drawRect(0,0,this.getBounds().width,this.getBounds().height),r.mask=t}),i.addChild(this),setTimeout(function(){r.setScroll(0)},1)},r=n.prototype=new t,i;return r.setScroll=function(e){return e<0?this.y=0:this.getBounds().height-this.parent.getBounds().height<0?this.y=0:e>this.getBounds().height-this.parent.getBounds().height?this.y=0-(this.getBounds().height-this.parent.getBounds().height):this.y=0-e,this.onScroll(),this},r.getScroll=function(){return 0-this.y},r.down=function(e){return this.setScroll(this.getScroll()+e)},r.up=function(e){return this.setScroll(this.getScroll()-e)},r.getPercentage=function(){return this.getScroll()/(this.getBounds().height-this.parent.getBounds().height)},r.scrollTo=function(e){this.setScroll(e*(this.getBounds().height-this.parent.getBounds().height))},r.onScroll=function(){i=new e.Event("scroll"),this.dispatchEvent(i)},n}),define("CatLab/Easelbone/Utilities/Mousewheel",[],function(){var e=function(){var e=this;document.body.addEventListener("mousewheel",function(t){e.scroll(t)})},t=e.prototype;return t.scroll=function(e){this.callback&&this.callback({x:0,y:e.wheelDelta})},t.listen=function(e){this.stop(),this.callback=e},t.stop=function(){this.callback=null},new e}),define("CatLab/Easelbone/Controls/ScrollArea",["CatLab/Easelbone/Controls/Base","CatLab/Easelbone/Controls/ScrollBar","CatLab/Easelbone/EaselJS/DisplayObjects/ScrollArea","CatLab/Easelbone/Utilities/Mousewheel"],function(e,t,n,r){var i=function(e){var r=this;this.element=e,this.scrollbar=new t(e.scrollbar),this.scrollbar.link(this),this.content=new n(e.content),this.content.on("scroll",this.onScroll,this),this.element.on("mouseover",this.enableScrollMouse,this),this.element.on("mouseout",this.disableScrollMouse,this),this.element.on("removed",this.disableScrollMouse,this)},s=i.prototype=new e;return s.enableScrollMouse=function(){var e=this;r.listen(function(t){e.scroll(t.y>0?50:-50)})},s.disableScrollMouse=function(){r.stop()},s.onScroll=function(e){this.trigger("scroll",{percentage:this.content.getPercentage(),contentHeight:this.content.getBounds().height,containerHeight:this.content.parent.getBounds().height})},s.scrollTo=function(e){this.content.scrollTo(e)},s.scroll=function(e){this.content.up(e)},s.up=function(){this.content.up(25)},s.down=function(){this.content.down(25)},i}),define("CatLab/Easelbone/Controls/ListElement",[],function(){var e=function(e){this.element=e},t=e.prototype;return t.focus=function(){this.dispatchEvent("focus")},e}),define("CatLab/Easelbone/Controls/List",["EaselJS","CatLab/Easelbone/Controls/ListElement"],function(e,t){var n=function(e){this.initialize(),this.listItems=[],typeof e!="undefined"&&this.setChildElement(e)},r=n.prototype=new e.Container;return r.setChildElement=function(e){this.childElement=e;var t=new e;this.boundary={x:t.boundary.x,y:t.boundary.y}},r.getChildElement=function(){if(typeof this.childElement=="undefined")throw"No child element set.";return this.childElement},r.updateBounds=function(){this.setBounds(0,0,this.boundary.x,this.boundary.y*this.listItems.length)},r.createElement=function(){var e=new t(new(this.getChildElement()));return this.listItems.push(e),this.addChild(e.element),e.element.y=this.boundary.y*(this.listItems.length-1),this.updateBounds(),e},n}),define("CatLab/Easelbone/Controls/FloatContainer",["EaselJS","CatLab/Easelbone/Controls/ListElement"],function(e,t){var n=function(e,t){this.initialize(),this.listItems=[],typeof e!="undefined"&&this.setChildElement(e),this.rows=0,this.columns=t,this.currentColumn=0},r=n.prototype=new e.Container;return r.setChildElement=function(e){this.childElement=e;var t=new e;this.boundary={x:t.boundary.x,y:t.boundary.y}},r.getChildElement=function(){if(typeof this.childElement=="undefined")throw"No child element set.";return this.childElement},r.updateBounds=function(){this.setBounds(0,0,this.boundary.x*this.columns,this.boundary.y*this.rows)},r.nextRow=function(){this.currentColumn=1,this.rows++},r.getNextPosition=function(){var e={};return this.currentColumn++,this.currentColumn>this.columns&&this.nextRow(),e.x=this.boundary.x*(this.currentColumn-1),e.y=this.boundary.y*this.rows,e},r.createElement=function(){var e=new t(new(this.getChildElement()));this.listItems.push(e),this.addChild(e.element);var n=this.getNextPosition();return e.element.x=n.x,e.element.y=n.y,this.updateBounds(),e},n}),define("CatLab/Easelbone/EaselJS/DisabledButtonHelper",["EaselJS"],function(e){var t=function(e,t,n,r,i,s,o){this.initialize(e,t,n,r,i,s,o)},n=t.prototype;n.target=null,n.overLabel=null,n.outLabel=null,n.downLabel=null,n.play=!1,n.setEnabled=function(e){},n.getEnabled=function(){return this._enabled};try{Object.defineProperties(n,{enabled:{get:n.getEnabled,set:n.setEnabled}})}catch(r){}return n._isPressed=!1,n._isOver=!1,n._enabled=!1,n.initialize=function(e,t,n,r,i,s,o){if(!e.addEventListener)return;this.target=e,e.mouseChildren=!1,this.overLabel=n==null?"over":n,this.outLabel=t==null?"out":t,this.downLabel=r==null?"down":r,this.play=i,this.setEnabled(!0),this.handleEvent({}),s&&(o&&(s.actionsEnabled=!1,s.gotoAndStop&&s.gotoAndStop(o)),e.hitArea=s)},n.toString=function(){return"[DisabledButtonHelper]"},n.handleEvent=function(e){var t,n=this.target,r=e.type;r=="mousedown"?(this._isPressed=!0,t=this.downLabel):r=="pressup"?(this._isPressed=!1,t=this._isOver?this.overLabel:this.outLabel):r=="rollover"?(this._isOver=!0,t=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,t=this._isPressed?this.overLabel:this.outLabel),this.play?n.gotoAndPlay&&n.gotoAndPlay(t):n.gotoAndStop&&n.gotoAndStop(t)},t}),define("CatLab/FakeWebremote/Models/User",[],function(){return function(e){var t=e,n,r,i;this.getAccessToken=function(){return t},this.setId=function(e){i=e},this.getId=function(){return i},this.setName=function(e){n=e},this.getName=function(){return n},this.setAvatar=function(e){r=e},this.getAvatar=function(){return r}}}),define("CatLab/FakeWebremote/Models/Control",[],function(){return function(e,t){var n=0,r={},i,s=e,o,u=[];this.id=e,this.pushed=function(){return n===0},this.scale=function(){return n},this.update=function(e){n>0&&e==0&&this.trigger("click"),n=e},this.getLabel=function(){return'<span class="control-label '+o+'">'+s+"</span>"},this.setStaticLabel=function(e,t){return s=e,o=t,this},this.setLabel=function(n,r){return t.emit("button:label",{id:e,label:n}),this},this.click=function(e){return this.on("click",e),this},this.on=function(e,t){return typeof r[e]=="undefined"&&(r[e]=[]),r[e].push(t),this},this.trigger=function(e){var t=[];if(typeof r[e]!="undefined")for(i=0;i<r[e].length;i++)t.push(r[e][i]);for(i=0;i<t.length;i++)try{t[i]()}catch(n){console.log(n)}return this},this.off=function(e){return r[e]=[],this},this.clearEvents=function(){return r={},this},this.addDomElement=function(e){var t=this,n=[];return n.push(e.addEventListener("click",function(){t.trigger("click")})),u.push({element:e,listeners:n}),this},this.clearDomElements=function(){for(var e=0;e<u.length;e++)for(var t=0;t<u[e].listeners.length;t++)u[e].element.removeEventListener("click",u[e].listeners[t]);return u=[],this},this.isLocalAuthentication=function(){return!1},this.log=function(e){t.log("["+this.id+"] "+e)}}}),define("CatLab/FakeWebremote/Models/ControlUser",["CatLab/FakeWebremote/Models/User","CatLab/FakeWebremote/Models/Control"],function(e,t){var n=function(e){this.initialize(e)};return n.prototype=e,n.prototype.setWebcontrol=function(e){this.Webcontrol=e},n.prototype.initialize=function(e){this.controls={},this.currentView=null,this.color="orange",this.colorName="orange",this.tmpid=null,this.active=!1,this.userdata=e,this.profiledata={},this.access_token=null},n.prototype.clearControls=function(){if(this.currentView!=null){var e=this.Webcontrol.getViewLabels(this.currentView);for(var t=0;t<e.length;t++)this.control(e[t].id).setStaticLabel(e[t].label,"mobile")}},n.prototype.clearEvents=function(){for(this.tmpid in this.controls)this.controls.hasOwnProperty(this.tmpid)&&this.controls[this.tmpid].clearEvents()},n.prototype.trigger=function(e,t){e=="button:down"?this.control(t.id).update(1):e=="button:up"?this.control(t.id).update(0):e=="user:login"?this.login(t):e=="user:logout"&&this.logout(t)},n.prototype.emit=function(e,t){return this.Webcontrol._playerEmit(this,e,t),!0},n.prototype.control=function(e){var n=this;return typeof this.controls[e]=="undefined"&&(this.controls[e]=new t(e,n)),this.controls[e]},n.prototype.getId=function(){return this.userdata.id},n.prototype.getName=function(){return"User "+this.getId()},n.prototype.getType=function(){return"mobile"},n.prototype.getIcon=function(){return"fa fa-mobile-phone"},n.prototype.login=function(e){var t=this;this.access_token=e.access_token,this.Webcontrol.getOAuthClient(function(e){e.profile(t.access_token,function(e){t.profiledata=e.user})})},n.prototype.getData=function(){return this.profiledata},n.prototype.logout=function(e){this.profiledata=null,this.access_token=null},n.prototype.setColor=function(e,t){this.color=e,this.colorName=t,this.emit("color:set",{color:e,name:t})},n.prototype.getColor=function(){return this.color},n.prototype.getColorName=function(){return this.colorName},n.prototype.isActive=function(){return this.active},n.prototype.toggleActive=function(){this.active=!this.active,this.setLabel()},n.prototype.setActive=function(e){this.active=e,this.setLabel()},n.prototype.setLabel=function(){this.active==1?this.control("join-game").setLabel("LEAVE"):this.control("join-game").setLabel("JOIN")},n.prototype.setView=function(e){this.currentView=e,this.clearControls(),this.emit("view:set",{id:e})},n.prototype.setUserData=function(e,t){console.log("Setting user data: ",e,t)},n.prototype.isLocalAuthentication=function(){return!0},n.prototype.log=function(e){console.log("[u:"+this.getId()+"] "+e)},n}),define("CatLab/FakeWebremote/Models/KeyboardUser",["CatLab/FakeWebremote/Models/ControlUser"],function(e){var t=function(e){function s(t){for(i=0;i<e.length;i++)if(e[i].key==t)return r=n.control(e[i].id),r;return null}typeof e=="undefined"&&(e=[{id:"up",label:"↑",key:38},{id:"down",label:"↓",key:40},{id:"right",label:"→",key:39},{id:"left",label:"←",key:37},{id:"a",label:"A",key:65},{id:"b",label:"B",key:66},{id:"x",label:"X",key:88},{id:"y",label:"Y",key:89},{id:"join-game",label:"SPACE",key:32},{id:"start-game",label:"ENTER",key:13}]),this.keys=e,this.initialize({id:"keyboard"});var t={},n=this,r,i=0;document.addEventListener("keydown",function(e){r=s(e.keyCode),r&&r.update(1)}),document.addEventListener("keyup",function(e){r=s(e.keyCode),r&&r.update(0)}),this.clearControls=function(){for(var t=0;t<e.length;t++)this.control(e[t].id).setStaticLabel(e[t].label,"keyboard")},this.getType=function(){return"keyboard"},this.getIcon=function(){return"fa fa-keyboard-o"},this.setView=function(e){this.clearControls()},this.emit=function(e,t){return!1},this.isLocalAuthentication=function(){return!1},this.clearControls()};return t.prototype=new e,t.prototype.constructor=t,t}),define("CatLab/Easelbone/FrontController",["CatLab/Easelbone/Utilities/Loader","CatLab/Easelbone/Views/Root","CatLab/Easelbone/Views/Base","CatLab/Easelbone/Views/Navigatable","CatLab/Easelbone/Controls/Slider","CatLab/Easelbone/Controls/Checkbox","CatLab/Easelbone/Controls/Button","CatLab/Easelbone/Controls/Selectbox","CatLab/Easelbone/Controls/ScrollBar","CatLab/Easelbone/Controls/ScrollArea","CatLab/Easelbone/Controls/List","CatLab/Easelbone/Controls/FloatContainer","CatLab/Easelbone/EaselJS/DisplayObjects/BigText","CatLab/Easelbone/EaselJS/DisabledButtonHelper","CatLab/Easelbone/Utilities/GlobalProperties","CatLab/FakeWebremote/Models/KeyboardUser"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v){return{initialize:function(){},setProperties:function(e){d.set(e)},Views:{Root:t,Base:n,Navigatable:r},Controls:{Slider:i,Checkbox:s,Button:o,Selectbox:u,ScrollBar:a,ScrollArea:f,List:l,FloatContainer:c},EaselJS:{BigText:h,DisabledButtonHelper:DisabledButtonHelper},FakeWebremote:{KeyboardUser:v},Loader:new e}}),define("easelbone",["CatLab/Easelbone/FrontController"],function(e){return e});