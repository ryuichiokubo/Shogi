(function() {
    "use strict";

    // Board controller
    // keep track of where and what kind of pieces are on board
 
    var board = {
        
        square: [],
        
        setPiece: function(x, y, type, mine) {
            if (!board.square[x]) {
                board.square[x] = [];
            }
            board.square[x][y] = {
                type: type,
                mine: mine
            };
        },

        getPiece: function(x, y) {
            if (!board.square[x]) {
                return null;
            } else {
                return board.square[x][y] || null;
            }
        },

        removePiece: function(x, y) {
            if (!board.square[x] || !board.square[x][y]) {
                return null;
            }
            delete board.square[x][y];
        },
        
	setAvailable: function(x, y) {
            if (!board.square[x]) {
                board.square[x] = [];
            }

	    if (board.square[x][y]) {
		board.square[x][y].available = true;
	    } else {
		board.square[x][y] = {
		    available: true
		};
	    }
	},

	getAvailable: function(x, y) {
            if (!board.square[x]) {
                return false;
            } else if (!board.square[x][y]) {
		return false;
	    } else {
		return !!board.square[x][y].available;
	    }
	},

	resetAvailable: function() {
	    for (var i = 0; i < board.square.length; i++) {
		for (var j = 0; j < board.square[i].length; j++) {
		    if (board.square[i] && board.square[i][j]) {
			board.square[i][j].available = false;
		    }
		}
	    }
	},

	getInhandAvailPos: function(type) {
	    var i, j, k, pos = [];

	    var squareAvailable = function(piece) {
		return (!piece || !piece.type);
	    };

	    var isNihu = function(x) {
		if (type !== 'hu') {
		    return false;
		}
		
		for (k = 0; k < board.square[x].length; k++) {
		    if (board.square[x][k] && board.square[x][k].type === 'hu' && board.square[x][k].mine === true) {
			return true;
		    }
		}
	    };

	    for (i = 0; i < board.square.length; i++) {
		for (j = 0; j < board.square[i].length; j++) {
		    if (squareAvailable(board.square[i][j]) && !isNihu(i)) {
			pos.push([i, j]);
		    }
		}
	    }
	    
	    return pos;
	},

        debug: function() {
            console.log(JSON.stringify(board.square));
        }
    };
    
    this.board = board;
    
}).call(this);
