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
	    var i, j, k, pos = [];

	    var placeAvailable = function(place) {
		return (!place || !place.type);
	    };

	    var isNihu = function(x) {
		if (type !== 'hu') {
		    return false;
		}
		
		for (k = 0; k < board.places[x].length; k++) {
		    if (board.places[x][k] && board.places[x][k].type === 'hu' && board.places[x][k].mine === true) {
			return true;
		    }
		}
	    };

	    for (i = 0; i < board.places.length; i++) {
		for (j = 0; j < board.places[i].length; j++) {
		    if (placeAvailable(board.places[i][j]) && !isNihu(i)) {
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
