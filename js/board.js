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
        
        debug: function() {
            console.log(JSON.stringify(board.places));
        }
    };
    
    this.board = board;
    
}).call(this);
