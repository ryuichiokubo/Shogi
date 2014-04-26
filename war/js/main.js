(function() {
    "use strict";

    // Main controller
    
    var rowNames = ['one', 'two', 'three', 'four',
                    'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 
                       'go', 'roku', 'nana', 'hachi', 'kyu'];

    // Num: indexed from 0, Class: indexed from 'one' or 'ichi'
    var convertPosNumToClass = function(row, column) {
        if (rowNames[row] && columnNames[column]) {
            return rowNames[row] + ' ' + columnNames[column];
        } else {
            return false;
        }
    };

    var convertPosClassToNum = function(posClass) {
        var posClassArr, rowName, columnName, rowNum, columnNum;
        
        posClassArr = posClass.split(' ');
        rowName = posClassArr[0];
        columnName = posClassArr[1];
        rowNum = rowNames.indexOf(rowName);
        columnNum = columnNames.indexOf(columnName);
        
        return [rowNum, columnNum];
    };

    var getPosClassFromElement = function(element) {
        var classes, rowHit, columnHit;
        
        classes = element.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (rowNames.indexOf(classes[i]) > -1) {
                rowHit = rowNames[rowNames.indexOf(classes[i])];
            }
            if (columnNames.indexOf(classes[i]) > -1 ) {
                columnHit = columnNames[columnNames.indexOf(classes[i])];
            }
        }
        
        return rowHit + ' ' + columnHit;
    };

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
	        selectedClass = getPosClassFromElement(ui.selected);
		selectedNum = convertPosClassToNum(selectedClass);
	    }
            
            avail[0] = selectedNum[0] + moveX;
            avail[1] = selectedNum[1] + moveY;
            
            availClass = convertPosNumToClass(avail[0], avail[1]); // false if out of board
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
		inhandAvailClass = convertPosNumToClass(inhandAvailPos[i][0], inhandAvailPos[i][1]);
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
        if (ui.hasClass(event.target, 'oppoPiece')) {
            attackSelect(event);
        } else {
	    ui.setSelected(event);
	    resetAvailable();
	    setAvailable();
	}
    };

    var moveSelected = function(newPosClass, isInhand) {
        var type, newPosNum, oldPosClass, oldPosNum;
        
	var checkPromotionAndType = function(newPosNum, oldPosNum, isInhand) {
	    // XXX do not allow non-nari if that will make the piece unmovable

	    var type = ui.selected.getAttribute('data-piece');

	    var canPromote = function() {
		if (isInhand || !def.piece[type].prom) {
		    return false;
		} else {
		    return ((newPosNum[1] < def.board.promoteRow) || (oldPosNum[1] < def.board.promoteRow));
		}
	    };

	    if (canPromote() && ui.dialog.askPromote()) {
		ui.promote(type);
		type = def.piece[type].prom;
	    }

	    return type;
	};


        newPosNum = convertPosClassToNum(newPosClass);
        oldPosClass = getPosClassFromElement(ui.selected);
        oldPosNum = convertPosClassToNum(oldPosClass);

	type = checkPromotionAndType(newPosNum, oldPosNum, isInhand);

        board.setPiece(newPosNum[0], newPosNum[1], type, true);
        board.removePiece(oldPosNum[0], oldPosNum[1]);

	ui.moveSelected(newPosClass);
	resetAvailable();
        
	// XXX POST to server what piece was moved to where
    };

    var squareSelect = function(event) {
        var posClass, isInhand = false;
        
        if (!ui.selected) {
	    console.error("Square cannot be selected if no piece is selected.");
            return;
        }
        
        if (ui.isSelectedInhand()) {
	    isInhand = true;
	    ui.prepareInhandMove();
        }

        posClass = getPosClassFromElement(event.target);
        moveSelected(posClass, isInhand);
    };
    
    var attackSelect = function(event) {
        var posClass, posNum;
        
	var winCheck = function() {
	    var type = event.target.getAttribute('data-piece');

	    if (type === 'o') {
		ui.dialog.win();
	    }
	};

        posClass = getPosClassFromElement(event.target);
        posNum = convertPosClassToNum(posClass);

	if (board.getAvailable(posNum[0], posNum[1])) {
	    moveSelected(posClass);
	    ui.moveToHand(event.target);
	    winCheck();
	}
    };
    
    var main = function () {
        var setInitialPieces = function() {
            var posNum;

            for (var i = 0; i < def.init.length; i++) {
		ui.setPiece(def.init[i].piece, def.init[i].pos, def.init[i].mine, pieceSelect);

                posNum = convertPosClassToNum(def.init[i].pos, def.init[i].mine);
                board.setPiece(posNum[0], posNum[1], def.init[i].piece, def.init[i].mine);
            }
        };

	ui.init();
        setInitialPieces();
    };
    
    this.main = main;

}).call(this);
