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

    this.DomElem = DomElem;

}).call(this);
