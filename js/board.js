(function() {
    "use strict";

    // keep track of where and what kind of pieces are on board
    var board = {
        
        places: [],
        
        setPiece: function(x, y, type, mine) {
            if (!board.places[x]) {
                board.places[x] = [];
            }
            board.places[x][y] = {
                type: type,
                mine: mine
            };
        },

        getPiece: function(x, y) {
            if (!board.places[x]) {
                return null;
            } else {
                return board.places[x][y] || null;
            }
        },

        removePiece: function(x, y) {
            if (!board.places[x] || !board.places[x][y]) {
                return null;
            }
            delete board.places[x][y];
        },
        
	setAvailable: function(x, y) {
            if (!board.places[x]) {
                board.places[x] = [];
            }

	    if (board.places[x][y]) {
		board.places[x][y].available = true;
	    } else {
		board.places[x][y] = {
		    available: true
		};
	    }
	},

	getAvailable: function(x, y) {
            if (!board.places[x]) {
                return false;
            } else if (!board.places[x][y]) {
		return false;
	    } else {
		return !!board.places[x][y].available;
	    }
	},

	resetAvailable: function() {
	    for (var i = 0; i < board.places.length; i++) {
		for (var j = 0; j < board.places[i].length; j++) {
		    if (board.places[i] && board.places[i][j]) {
			board.places[i][j].available = false;
		    }
		}
	    }
	},

	getMochiAvailPos: function(type) {
	    // XXX if type hu
	    var pos = [];

	    board.debug();
	    for (var i = 0; i < board.places.length; i++) {
		for (var j = 0; j < board.places[i].length; j++) {
		    console.log(board.places[i][j]);
		    if (!board.places[i][j] || !board.places[i][j].type) {
			pos.push([i, j]);
		    }
		}
	    }
	    
	    return pos;
	},

        debug: function() {
            console.log(JSON.stringify(board.places));
        }
    };
    
    this.board = board;
    
}).call(this);
