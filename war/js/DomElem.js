(function() {
    "use strict";

    var DomElem = function DomElem(id) {
	// XXX if typeof id === string ... else treat as dom element
	this.elem = document.getElementById(id);
    };

    DomElem.prototype.on = function(type, fn) {
	this.elem.addEventListener(type, fn);
    };

    DomElem.prototype.hide = function() {
	this.elem.style.display = "none";
    };

    DomElem.prototype.show = function() {
	this.elem.style.display = "block";
    };

    this.DomElem = DomElem;

}).call(this);
