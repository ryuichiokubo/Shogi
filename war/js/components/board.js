(function() {
    "use strict";

    var Board = function() {
	DomElem.apply(this, arguments);
    };

    Board.prototype = Object.create(DomElem.prototype);
    Board.prototype.constructor = Board;

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
    };

    // singleton
    var board = null;

    Object.defineProperty(this, "board", {
	configurable : false,
	enumerable : true,

	get: function() {
	    if (!board) {
		board = new Board('set');
	    }
	    return board;
	}
    });

}).call(this);
