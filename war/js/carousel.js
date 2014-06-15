(function() {
    "use strict";

    /* 
    __extends = function(child, parent) {
	for (var key in parent) {
	    if (__hasProp.call(parent, key))
		child[key] = parent[key];
	}
	function ctor() {
	    this.constructor = child;
	}
	ctor.prototype = parent.prototype;
	child.prototype = new ctor();
	child.__super__ = parent.prototype;
	return child;
    };
    */

    var Carousel = function() {
	this.prototype = DomElem.prototype;
	DomElem.apply(this, arguments);
    };

    // XXX get these functions from domInterface.scrollable
    Carousel.prototype.scrollSet = function(pos) {
        this.elem.scrollLeft = pos;
    };

    Carousel.prototype.scrollMove = function(amount, back) {
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

    this.Carousel = Carousel;

}).call(this);
