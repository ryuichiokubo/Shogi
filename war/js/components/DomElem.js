(function() {
    "use strict";

    var DomElem = function(domSeed, clickListener) {
	this.elem = (typeof domSeed === "string") ? document.getElementById(domSeed) : domSeed;

	if (clickListener) {
	    this.on('click', clickListener);
	}
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

    // TODO: text interface
    DomElem.prototype.setText = function(text) {
	this.elem.textContent = text; // XXX get id of text for translation
    };


    this.DomElem = DomElem;

}).call(this);
