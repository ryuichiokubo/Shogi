(function() {
    "use strict";
    
    var set; // board area, not including mochigoma
    var selected = null; // currently selected piece as DOM Element

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
	    set.appendChild(div);
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
        
        type = selected.getAttribute('data-piece');

        if (selected.parentElement.className === 'mochi') {
	    mochiAvailPos = board.getMochiAvailPos(type);
	    for (i = 0; i < mochiAvailPos.length; i++) {
		mochiAvailClass = convertPosNumToClass(mochiAvailPos[i][0], mochiAvailPos[i][1]);
		render(mochiAvailClass);
	    }
	
	} else {
	    move = def.piece[type].move;
            selectedClass = getPosClassFromElement(selected);
            selectedNum = convertPosClassToNum(selectedClass);
            
            for (i = 0; i < move.length; i++) {
                checkMoveAndMark(move[i][0], move[i][1], move[i][2]);
            }
	}
    };
    
    var resetAvailable = function() {
	var availElems;

        availElems = set.querySelectorAll(".available");
        for (var i = 0; i < availElems.length; i++) {
            set.removeChild(availElems[i]);
        }

	board.resetAvailable();
    };

    var pieceSelect = function(event) {
        if (hasClass(event.target, 'oppoPiece')) {
            attackSelect(event);
            return;
        }
        
	resetAvailable();
        
        if (selected) {
            selected.style["background-color"] = '';
        }
        selected = event.target;
        selected.style['background-color'] = 'rgba(255, 255, 0, 0.75)';
        
        markAvailable();
    };

    var moveSelected = function(newPosClass) {
        var type, newPosNum, oldPosClass, oldPosNum;
        
	var checkNari = function(type) {
	    var srcPath;

	    // XXX TODO: mochigoma

	    // XXX ask
	    if (newPosNum[1] < 3 && def.piece[type].nari) {
                srcPath = 'svg/' +  def.piece[type].nari + '.svg';
                selected.setAttribute('src', srcPath);
		selected.setAttribute('data-piece', def.piece[type].nari);
		type = def.piece[type].nari;
	    }

	    return type;
	};

	type = selected.getAttribute('data-piece');

	// update board object
        newPosNum = convertPosClassToNum(newPosClass);
	type = checkNari(type);
        board.setPiece(newPosNum[0], newPosNum[1], type, true);

        oldPosClass = getPosClassFromElement(selected);
        oldPosNum = convertPosClassToNum(oldPosClass);
        board.removePiece(oldPosNum[0], oldPosNum[1]);

	// move selected and remove color
        selected.setAttribute('class', 'piece ' + newPosClass);
        selected.style["background-color"] = '';
	resetAvailable();
        
        selected = null;
    };

    var placeSelect = function(event) {
        var posClass;
        
        if (!selected) {
            return;
        }
        
        if (selected.parentElement.className === 'mochi') {
            // Keep left-most piece of same kind without 'overwrap'
            if (selected.nextElementSibling) {
                var thisHasWrap = hasClass(selected, 'overwrap') ? true : false;
                var nextHasWrap = hasClass(selected.nextElementSibling, 'overwrap') ? true : false;
                if (!thisHasWrap && nextHasWrap) {
                    selected.nextSibling.setAttribute('class', 'piece');
                }
            }
            // Move selected to Set area from Mochigoma
            set.appendChild(selected);
        }

        posClass = getPosClassFromElement(event.target);
        moveSelected(posClass);
    };
    
    var attackSelect = function(event) {
        var posClass, posNum;
        
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
	}
    };
    
    var main = function () {
        var setInitialPieces = function() {
            var classAttr, srcPath, img, posNum;

            for (var i = 0; i < def.init.length; i++) {
                img = document.createElement('img');

                srcPath = 'svg/' +  def.init[i].piece + '.svg';

                classAttr = 'piece' + ' ' + def.init[i].pos;
                if (def.init[i].mine === false) {
                    classAttr += ' oppoPiece';
                }

                img.setAttribute('src', srcPath);
                img.setAttribute('class', classAttr);
                img.setAttribute('data-piece', def.init[i].piece);
                img.addEventListener('click', pieceSelect);
                set.appendChild(img);

                posNum = convertPosClassToNum(def.init[i].pos);
                board.setPiece(posNum[0], posNum[1], def.init[i].piece, def.init[i].mine);
            }
        };

        set = document.querySelector("#set");
        setInitialPieces();
    };
    
    this.main = main;

}).call(this);
