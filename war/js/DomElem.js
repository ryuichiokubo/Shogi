(function() {
    "use strict";

    var DomElem = function(domSeed, clickListener) {
	// TODO: check NodeType, accept selector as parameter
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

    // TODO: scrollable interface
    // XXX only sideways for now
    DomElem.prototype.scrollSet = function(pos) {
	this.elem.scrollLeft = pos;
    };

    DomElem.prototype.scrollMove = function(amount, back) {
        var frame = 30;
        var cntr = frame;
	var elem = this.elem;

        var timer = setInterval(function() {
	    if (cntr > 0) {
		if (back) {
		    elem.scrollLeft = elem.scrollLeft - amount / frame;
		} else {
		    elem.scrollLeft = elem.scrollLeft + amount / frame;
		}
		cntr--;
    	   } else {
    	       clearTimeout(timer);
    	   }
        }, 15);
    };


    this.DomElem = DomElem;

}).call(this);
