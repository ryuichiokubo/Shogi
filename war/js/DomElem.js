(function() {
    "use strict";

    var DomElem = function(domSeed, clickListener) {
	// TODO: check NodeType, accept selector as parameter
	this.elem = (typeof domSeed === "string") ? document.getElementById(domSeed) : domSeed;

	if (clickListener) {
	    this.prototype.on.apply(this, ['click', clickListener]);
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

    // TODO: piece interface
    DomElem.prototype.getId = function() {
	return this.elem.id;
    };

    DomElem.prototype.select = function() {
	this.elem.style.transform = 'scale(1.2)';
    };

    DomElem.prototype.deselect = function() {
	this.elem.style.transform = '';
    };


    this.DomElem = DomElem;

}).call(this);
