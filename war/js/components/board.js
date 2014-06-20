(function() {
    "use strict";

    var Board = function() {
	DomElem.apply(this, arguments);
	this.data = game; // XXX game should not be accessed globally
    };

    Board.prototype = Object.create(DomElem.prototype);
    Board.prototype.constructor = Board;

    Board.SETTINGS = def.board;

    Board.prototype.setAvailable = function(availPos, handler) {
	console.assert(availPos instanceof Position);
	console.assert(typeof handler === 'function');

	var availClass = availPos.asClassName();
        var div = document.createElement('div');

        div.setAttribute('class', 'available ' + availClass);
        div.addEventListener('click', handler);
        this.elem.appendChild(div);
    };

    Board.prototype.resetAvailable = function() {
	var availElems;
	
	availElems = this.elem.querySelectorAll(".available");
	for (var i = 0; i < availElems.length; i++) {
	    this.elem.removeChild(availElems[i]);
	}
    };

    Board.prototype.setPiece = function(pos, piece) {
	console.assert(pos instanceof Position);
	console.assert(piece instanceof Piece);

	piece.addClass(pos.asClassName());
        this.elem.appendChild(piece.elem);

	this.data.setPiece(pos.x, pos.y, piece.type, piece.owner); // XXX game should also take objects, not raw values
    };

    Board.prototype.getInitAvailPos = function(type) {
	console.assert(Piece.TYPES[type]);
	
	return this.data.getInitAvailPos(type);
    };

    // singleton
    var board = null;

    Object.defineProperty(this, "board", {
	configurable: false,
	enumerable: true,

	get: function() {
	    if (!board) {
		board = new Board('set');
	    }
	    return board;
	}
    });

}).call(this);
