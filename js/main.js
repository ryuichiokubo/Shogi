(function() {
    "use strict";
    
    var rowNames = ['one', 'two', 'three', 'four',
                    'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 
                       'go', 'roku', 'nana', 'hachi', 'kyu'];

    var hasClass = function(element, className) {
        return (element.className.indexOf(className) > -1);
    };

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

    var markAvailable = function() {
        var i, type, move, selectedClass, selectedNum, mochiAvailPos, mochiAvailClass;

	var render = function(availClass) {
	    var div;

	    div = document.createElement('div');
	    div.setAttribute('class', 'available ' + availClass);
	    div.addEventListener('click', placeSelect);
	    ui.set.appendChild(div);
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

        var checkMoveAndMark = function(moveX, moveY, continuous) {
            var avail = [], currentPiece, availClass;
            
            avail[0] = selectedNum[0] + moveX;
            avail[1] = selectedNum[1] + moveY;
            
            currentPiece = board.getPiece(avail[0], avail[1]);
            availClass = convertPosNumToClass(avail[0], avail[1]);

            if (availClass && (!currentPiece || currentPiece.mine !== true)) {
		render(availClass);
		board.setAvailable(avail[0], avail[1]);

		if (currentPiece && currentPiece.mine === false) {
		    continuous = false;
		}
	    } else {
		continuous = false;
	    }

	    if (continuous) {
		checkMoveAndMark(nextVal(moveX), nextVal(moveY), continuous);
	    }
        };
        
        type = ui.selected.getAttribute('data-piece');

        if (ui.selected.parentElement.className === 'mochi') {
	    mochiAvailPos = board.getMochiAvailPos(type);
	    for (i = 0; i < mochiAvailPos.length; i++) {
		mochiAvailClass = convertPosNumToClass(mochiAvailPos[i][0], mochiAvailPos[i][1]);
		render(mochiAvailClass);
	    }
	
	} else {
	    move = def.piece[type].move;
            selectedClass = getPosClassFromElement(ui.selected);
            selectedNum = convertPosClassToNum(selectedClass);
            
            for (i = 0; i < move.length; i++) {
                checkMoveAndMark(move[i][0], move[i][1], move[i][2]);
            }
	}
    };
    
    var resetAvailable = function() {
	ui.resetAvailable();
	board.resetAvailable();
    };

    var pieceSelect = function(event) {
        if (hasClass(event.target, 'oppoPiece')) {
            attackSelect(event);
            return;
        }
        
	ui.setSelected(event);
	resetAvailable();
        markAvailable();
    };

    var moveSelected = function(newPosClass, isMochigoma) {
        var type, newPosNum, oldPosClass, oldPosNum;
        
	var checkNari = function(type) {
	    var srcPath;

	    var nariCondition = function() {
		if (isMochigoma) {
		    return false;
		} else {
		    if (!!def.piece[type].nari) {
			return ((newPosNum[1] < 3) || (oldPosNum[1] < 3));
		    } else {
			return false;
		    }
		}
	    };

	    if (nariCondition() && confirm('成りますか？')) {
		// XXX do not allow non-nari if that will make the piece unmovable
                srcPath = 'svg/' +  def.piece[type].nari + '.svg';
                ui.selected.setAttribute('src', srcPath);
		ui.selected.setAttribute('data-piece', def.piece[type].nari);
		type = def.piece[type].nari;
	    }

	    return type;
	};

	type = ui.selected.getAttribute('data-piece');

        oldPosClass = getPosClassFromElement(ui.selected);
        oldPosNum = convertPosClassToNum(oldPosClass);
        board.removePiece(oldPosNum[0], oldPosNum[1]);

	// update board object
        newPosNum = convertPosClassToNum(newPosClass);
	type = checkNari(type); // XXX pass args, return boolean, don't change value inside
        board.setPiece(newPosNum[0], newPosNum[1], type, true);

	// move selected and remove color
        ui.selected.setAttribute('class', 'piece ' + newPosClass);
        ui.selected.style["background-color"] = '';
	resetAvailable();
        
        ui.selected = null;
    };

    var placeSelect = function(event) {
	// XXX do not allow such a place where it will make the piece unmovable
        var posClass, isMochigoma;
        
        if (!ui.selected) {
            return;
        }
        
        if (ui.selected.parentElement.className === 'mochi') {
            // Keep left-most piece of same kind without 'overwrap'
            if (ui.selected.nextElementSibling) {
                var thisHasWrap = hasClass(ui.selected, 'overwrap') ? true : false;
                var nextHasWrap = hasClass(ui.selected.nextElementSibling, 'overwrap') ? true : false;
                if (!thisHasWrap && nextHasWrap) {
                    ui.selected.nextSibling.setAttribute('class', 'piece');
                }
            }
            // Move selected to Set area from Mochigoma
            ui.set.appendChild(ui.selected);

	    isMochigoma = true;
        }

        posClass = getPosClassFromElement(event.target);
        moveSelected(posClass, isMochigoma);
    };
    
    var attackSelect = function(event) {
        var posClass, posNum;
        
	var winCheck = function() {
	    var type = event.target.getAttribute('data-piece');

	    if (type === 'o') {
		alert("You won!!");
	    }
	};

        var moveToMochigoma = function(target) {
            var myMochi, targetSrc, inserted;

            myMochi = document.querySelector("#myMochi");
            target.setAttribute('class', 'piece');

            if (myMochi.children) {
                // Put same kind of pieces on top of existing pieces
                targetSrc = target.getAttribute('src');

                for (var i = 0; i < myMochi.children.length; i++) {
                    if (myMochi.children[i].getAttribute('src') === targetSrc) {
                        inserted = myMochi.insertBefore(target, myMochi.children[i+1]);
                        inserted.setAttribute('class', 'piece overwrap');
                    }
                }
            }
            if (!inserted) {
                // Put new kind of piece next to existing one or at the beginning
                myMochi.appendChild(target);
            }
        };

        posClass = getPosClassFromElement(event.target);
        posNum = convertPosClassToNum(posClass);

	if (board.getAvailable(posNum[0], posNum[1])) {
	    moveSelected(posClass);
	    moveToMochigoma(event.target);

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
