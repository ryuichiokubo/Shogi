(function() {
    "use strict";

    var Carousel = function() {
	DomElem.apply(this, arguments);
    };

    Carousel.prototype = Object.create(DomElem.prototype);
    Carousel.prototype.constructor = Carousel;

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
