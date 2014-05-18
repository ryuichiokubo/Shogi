(function() {
    "use strict";

    // Main controller
    
    var gameOn = false;

    var setAvailable = function() {
	// XXX do not allow such a place where it will make the piece unmovable

        var i, type, move, selectedClass, inhandAvailPos, inhandAvailClass;

	var set = function(availClass, availPosX, availPosY) {
	    ui.setAvailable(availClass, squareSelect);
	    board.setAvailable(availPosX, availPosY);
	};

	var nextVal = function(val) {
	    if (val < 0) {
	    	return val - 1;
	    } else if (val === 0) {
	    	return val;
	    } else {
	    	return val + 1;
	    }
	};

        var checkMoveAndSet = function(moveX, moveY, continuous, selectedNum) {
            var avail = [], currentPiece, availClass;
            
	    if (!selectedNum) {
	        selectedClass = ui.util.getPosClassFromElement(ui.selected);
		selectedNum = ui.util.convertPosClassToNum(selectedClass);
	    }
            
            avail[0] = selectedNum[0] + moveX;
            avail[1] = selectedNum[1] + moveY;
            
            availClass = ui.util.convertPosNumToClass(avail[0], avail[1]); // false if out of board
            currentPiece = board.getPiece(avail[0], avail[1]);

            if (availClass && (!currentPiece || currentPiece.mine !== true)) {
		// in board, square is empty or opponent piece
		set(availClass, avail[0], avail[1]);

		if (currentPiece && currentPiece.mine === false) {
		    // square has opponent piece --> next square is not available
		    continuous = false;
		}
	    } else {
		// this square is not available --> next square is not available
		continuous = false;
	    }

	    if (continuous) {
		// check adjacent square in the same direction (eg. kyosha, hisha, kaku)
		checkMoveAndSet(nextVal(moveX), nextVal(moveY), continuous, selectedNum);
	    }
        };
        
        type = ui.getSelectedType();

	// Calculate possible moves from selected position and move definition of each piece type.
        if (ui.isSelectedInhand()) {
	    // mochigoma
	    inhandAvailPos = board.getInhandAvailPos(type);
	    for (i = 0; i < inhandAvailPos.length; i++) {
		inhandAvailClass = ui.util.convertPosNumToClass(inhandAvailPos[i][0], inhandAvailPos[i][1]);
		set(inhandAvailClass, inhandAvailPos[i][0], inhandAvailPos[i][1]);
	    }
	} else {
	    move = def.piece[type].move;
            for (i = 0; i < move.length; i++) {
                checkMoveAndSet(move[i][0], move[i][1], move[i][2]);
            }
	}
    };
    
    var resetAvailable = function() {
	ui.resetAvailable();
	board.resetAvailable();
    };

    var pieceSelect = function(event) {
	if (gameOn) {
	    if (ui.util.hasClass(event.target, 'oppoPiece')) {
                attackSelect(event);
            } else {
	        ui.setSelected(event);
	        resetAvailable();
	        setAvailable();
	    }
	}
    };

    var winCheck = function(piece, mine) {
        var type = ui.util.getTypeFromElem(piece);
    
        if (type === 'o') {
	   if (mine) {
    	       ui.dialog.lose();
    	   } else {
    	       ui.dialog.win();
    	   }
	   gameOn = false;
        }
    };

    var moveAi = function(data) {
	var isCaptive, posClass, fromPiece, fromType, toType, toTypeDem, toPiece;

	isCaptive = data.fromX < 0 ? true : false; // XXX convey this info in better way

	fromPiece = ui.getPiece(data.fromX, data.fromY);
	toPiece = ui.getPiece(data.toX, data.toY);

	// move piece in UI
	posClass = ui.util.convertPosNumToClass(data.toX, data.toY);
	if (isCaptive) {
	    ui.removeCaptive(data.type, false);
	    ui.setPiece(data.type, posClass, false, pieceSelect);
	} else {
	    fromType = ui.util.getTypeFromElem(fromPiece);
	    if (data.type !== fromType) {
	        ui.promote(fromPiece, fromType);
	    }
	    fromPiece.setAttribute('class', 'piece oppoPiece ' + posClass); // XXX add proper method in ui
	}

	// move to InHand area if there is an existing piece
	if (board.getPiece(data.toX, data.toY)) {
	    ui.moveToHand(toPiece, false);
	    toType = ui.util.getTypeFromElem(toPiece);
	    toTypeDem = def.piece[toType].dem || toType; // XXX add proper method in ui
	    board.addCaptive(toType, false);	    
	    winCheck(toPiece, true);
	}

	// move piece in board object
        board.setPiece(data.toX, data.toY, data.type, false);
	if (isCaptive) {
	    board.removeCaptive(data.type, false);
	} else {
	    board.removePiece(data.fromX, data.fromY);
	}
	board.resetAvailable();

	board.debug();
    };

    var moveSelected = function(newPosClass, isInhand) {
        var type, newPosNum, oldPosClass, oldPosNum;
        
	var checkPromotionAndType = function(type, newPosNum, oldPosNum) {
	    // XXX do not allow non-nari if that will make the piece unmovable

	    var canPromote = function() {
		if (!def.piece[type].prom) {
		    return false;
		} else {
		    return ((newPosNum[1] < def.board.promoteRow) || (oldPosNum[1] < def.board.promoteRow));
		}
	    };

	    if (canPromote() && ui.dialog.askPromote()) {
		ui.promote(ui.selected, type);
		type = def.piece[type].prom;
	    }

	    return type;
	};

	type = ui.getSelectedType();

        newPosNum = ui.util.convertPosClassToNum(newPosClass);
	if (isInhand) {
	    board.removeCaptive(type, true);
	} else {
	    oldPosClass = ui.util.getPosClassFromElement(ui.selected);
	    oldPosNum = ui.util.convertPosClassToNum(oldPosClass);
	    type = checkPromotionAndType(type, newPosNum, oldPosNum);
	    board.removePiece(oldPosNum[0], oldPosNum[1]);
	}

        board.setPiece(newPosNum[0], newPosNum[1], type, true);

	ui.moveSelected(newPosClass);
	resetAvailable();
        
	if (gameOn) {
	    board.upload(moveAi);
	}
    };

    var squareSelect = function(event) {
        var posClass, isInhand = false;
        
	if (gameOn) {
	    if (!ui.selected) {
	        console.error("Square cannot be selected if no piece is selected.");
                return;
            }
            
            if (ui.isSelectedInhand()) {
	        isInhand = true;
	        ui.prepareInhandMove(ui.selected);
            }

            posClass = ui.util.getPosClassFromElement(event.target);
            moveSelected(posClass, isInhand);
	}
    };
    
    var attackSelect = function(event) {
        var posClass, posNum, type, typeDem;
        
	if (gameOn) {
	    posClass = ui.util.getPosClassFromElement(event.target);
            posNum = ui.util.convertPosClassToNum(posClass);

	    if (board.getAvailable(posNum[0], posNum[1])) {
	        winCheck(event.target, false);
	        type = ui.util.getTypeFromElem(event.target);
	        typeDem = def.piece[type].dem || type; // XXX add proper method in ui
	        ui.moveToHand(event.target, true);
	        board.addCaptive(typeDem, true);
	        moveSelected(posClass); // XXX structure better... it has to be called in the end to upload
	    }
	}
    };
    
    var main = function () {
        var setInitialPieces = function() {
            var posNum;

            for (var i = 0; i < def.init.length; i++) {
		ui.setPiece(def.init[i].piece, def.init[i].pos, def.init[i].mine, pieceSelect);

                posNum = ui.util.convertPosClassToNum(def.init[i].pos, def.init[i].mine);
                board.setPiece(posNum[0], posNum[1], def.init[i].piece, def.init[i].mine);
            }
        };

	// XXX separate
	var extraPieces = document.querySelectorAll("#extra .piece");
	var extraPieceHandler = function() {
	    ui.resetAvailable();
	    var initAvailPos = board.getInitAvailPos();
	    var squareSelect = function(selected) {console.log("@@@@@@@@ selected: ", selected);};
	    for (var i = 0; i < initAvailPos.length; i++) {
		var initAvailClass = ui.util.convertPosNumToClass(initAvailPos[i][0], initAvailPos[i][1]);
		ui.setAvailable(initAvailClass, squareSelect);
	    }
	};
	for (var i = 0; i < extraPieces.length; i++) {
	    extraPieces[i].addEventListener('click', extraPieceHandler);
	}

	document.querySelector("#start").addEventListener('click', function() {
	    document.querySelector("aside").style.display = 'none';
	    gameOn = true;
	});
	ui.init();
        setInitialPieces();
    };
    
    this.main = main;

}).call(this);
