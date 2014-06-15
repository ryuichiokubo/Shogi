(function() {
    "use strict";

    var Piece = function() {
	DomElem.apply(this, arguments);
    };

    Piece.prototype = DomElem.prototype;

    Piece.prototype.getId = function() {
	return this.elem.id;
    };

    Piece.prototype.select = function() {
	this.elem.style.transform = 'scale(1.2)';
    };

    Piece.prototype.deselect = function() {
	this.elem.style.transform = '';
    };


    this.Piece = Piece;

}).call(this);
