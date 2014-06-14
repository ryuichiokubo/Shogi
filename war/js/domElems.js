(function() {
    "use strict";

    var DomElems = function(dom, clickListener) {
	this.elems = (typeof dom === "string") ? document.querySelectorAll(dom) : dom;

	if (clickListener) {
	    this.on('click', clickListener);
	}
    };

    DomElems.prototype.applyToEach = function(fn, args) {
	for (var i = 0; i < this.elems.length; i++) {
	    var domE = new DomElem(this.elems[i]);
	    fn.apply(domE, args);
	}
    };

    DomElems.prototype.on = function(type, fn) {
	this.applyToEach(DomElem.prototype.on, [type, fn]);
    };

    DomElems.prototype.hide = function() {
	this.applyToEach(DomElem.prototype.hide);
    };

    DomElems.prototype.show = function() {
	this.applyToEach(DomElem.prototype.show);
    };

    DomElems.prototype.select = function() {
	this.applyToEach(DomElem.prototype.select);
    };

    DomElems.prototype.deselect = function() {
	this.applyToEach(DomElem.prototype.deselect);
    };


    this.DomElems = DomElems;

}).call(this);
