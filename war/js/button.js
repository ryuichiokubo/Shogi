(function() {
    "use strict";

    var Button = function() {
	this.prototype = DomElem.prototype;
	DomElem.apply(this, arguments);
    };

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
