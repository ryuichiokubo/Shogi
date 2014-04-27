(function() {
    "use strict";

    // Board controller
    // keep track of where and what kind of pieces are on board
 
    var square = [];
        
    var board = {
        
        setPiece: function(x, y, type, mine) {
            if (!square[x]) {
                square[x] = [];
            }
            square[x][y] = {
                type: type,
                mine: mine
            };
        },

        getPiece: function(x, y) {
            if (!square[x]) {
                return null;
            } else {
                return square[x][y] || null;
            }
        },

        removePiece: function(x, y) {
            if (!square[x] || !square[x][y]) {
                return null;
            }
            delete square[x][y];
        },
        
	setAvailable: function(x, y) {
            if (!square[x]) {
                square[x] = [];
            }

	    if (square[x][y]) {
		square[x][y].available = true;
	    } else {
		square[x][y] = {
		    available: true
		};
	    }
	},

	getAvailable: function(x, y) {
            if (!square[x]) {
                return false;
            } else if (!square[x][y]) {
		return false;
	    } else {
		return !!square[x][y].available;
	    }
	},

	resetAvailable: function() {
	    for (var i = 0; i < square.length; i++) {
		for (var j = 0; j < square[i].length; j++) {
		    if (square[i] && square[i][j]) {
			square[i][j].available = false;
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
		
		for (k = 0; k < square[x].length; k++) {
		    if (square[x][k] && square[x][k].type === 'hu' && square[x][k].mine === true) {
			return true;
		    }
		}
	    };

	    for (i = 0; i < square.length; i++) {
		for (j = 0; j < square[i].length; j++) {
		    if (squareAvailable(square[i][j]) && !isNihu(i)) {
			pos.push([i, j]);
		    }
		}
	    }
	    
	    return pos;
	},

	// Send the whole board info at once (no need to save state in server)
	upload: function(success) {
	    var xhr = new XMLHttpRequest();

	    xhr.onload = function() {
		success(JSON.parse(this.responseText));
	    };

	    xhr.open("POST", "ai");
	    xhr.setRequestHeader("Content-Type", "application/json");
	    xhr.send(JSON.stringify(square)); // XXX upload mochigoma too

	    board.debug();
	},

        debug: function() {
            console.log(JSON.stringify(square));
        }
    };
    
    this.board = board;
    
}).call(this);
