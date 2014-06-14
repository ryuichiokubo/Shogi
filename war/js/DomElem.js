(function() {
    "use strict";

    // @param: id of the element or dom element
    var DomElem = function DomElem(param) {
	// TODO: check NodeType, accept selector as parameter
	this.elem = (typeof param === "string") ? document.getElementById(param) : param;
    };

    DomElem.prototype.applyToEach = function(fn) {
	if (this.elem.length > 0) {
	    for (var i = 0; i < this.elem.length; i++) {
		fn(this.elem[i]);
	    }
	} else {
	    fn(this.elem);
	}
    };

    DomElem.prototype.on = function(type, fn) {
	this.applyToEach(function(elem) {
	    elem.addEventListener(type, fn);
	});
    };

    DomElem.prototype.hide = function() {
	this.applyToEach(function(elem) {
	    elem.style.display = "none";
	});
    };

    DomElem.prototype.show = function() {
	this.applyToEach(function(elem) {
	    elem.style.display = "block";
	});
    };

    // TODO: apply only if implements selectable interface
    DomElem.prototype.resetSelected = function() {
	this.applyToEach(function(elem) {
	    elem.style.transform = '';
	});
    };

    // TODO: button interface
    DomElem.prototype.enable = function() {
	this.elem.disabled = false;
    };

    DomElem.prototype.disable = function() {
	this.elem.disabled = true;
    };

    DomElem.prototype.isEnabled = function() {
	return (this.elem.disabled === false);
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
