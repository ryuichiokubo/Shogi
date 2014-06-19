(function() {
    "use strict";

    var Button = function() {
	DomElem.apply(this, arguments);
    };

    Button.prototype = Object.create(DomElem.prototype);
    Button.prototype.constructor = Button;

    Button.prototype.enable = function() {
	this.elem.disabled = false;
    };

    Button.prototype.disable = function() {
	this.elem.disabled = true;
    };

    Button.prototype.isEnabled = function() {
	return (this.elem.disabled === false);
    };

    // XXX include text interface?
 

    this.Button = Button;

}).call(this);
