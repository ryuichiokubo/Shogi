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
