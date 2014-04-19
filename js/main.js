/*jslint browser:true, indent:4 */
/*global def*/

(function() {
    
    var set; // board area, not including mochigoma
    var selected = null; // currently selected piece

    var rowNames = ['one', 'two', 'three', 'four',
                    'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 
                       'go', 'roku', 'nana', 'hachi', 'kyu'];

    // Num: indexed from 0, Class: indexed from 'one' or 'ichi'
    var convertPosNumToClass = function(row, column) {
        return rowNames[row] + ' ' + columnNames[column];
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

    var getPosClassFromCoordinate = function(event) {
        var x, y, row, column;
        
        x = event.offsetX;
        y = event.offsetY;
        row = Math.floor(x / 60);
        column = Math.floor(y / 60);
        return convertPosNumToClass(row, column);
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
        var type, move, posClass, posNum, avail = [], availClass;
        
        type = selected.getAttribute('data-piece');
        move = def.piece[type].move;
        posClass = getPosClassFromElement(selected);
        posNum = convertPosClassToNum(posClass);
        
        for (var i = 0; i < move.length; i++) {
            if (move[i][0] === 0 && move[i][1] === 0) {
                console.error("Invalid definition"); // XXX add check def function
                return;
            }
            
            if (move[i][2]) {
                // add moves to anywhere in the direction of x, y
                // (current position + board size at max)
                var j = 2;
                while (Math.abs(move[i][0]*j) < 9 && Math.abs(move[i][1]*j) < 9) {
                    move.push([move[i][0]*j, move[i][1]*j]);
                    j++;
                }
                move[i][2] = false; // no need to add moves anymore
            }

            avail[0] = posNum[0] + move[i][0];
            avail[1] = posNum[1] + move[i][1];
            
            console.log('move len: ', move.length);
            console.log('move: ', move[i]);
            console.log('num: ', avail);

            availClass = convertPosNumToClass(avail[0], avail[1]);
            
            console.log('class: ', availClass);
            // XXX TODO: highlight availClass position if not undefined
        }
    };
    
    var pieceSelect = function(event) {
        if (event.target.className.indexOf('oppoPiece') > -1) {
            return;
        }
        
        event.stopPropagation(); // prevent event on board
        
        if (selected) {
            selected.style["background-color"] = '';
        }
        selected = event.target;
        selected.style['background-color'] = 'rgba(255, 255, 0, 0.75)';
        
        markAvailable();
    };

    var moveSelected = function(posClass) {
        selected.setAttribute('class', 'piece ' + posClass);
        selected.style["background-color"] = '';
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
                var thisHasWrap = selected.className.indexOf('overwrap') > -1 ? true : false;
                var nextHasWrap = selected.nextElementSibling.className.indexOf('overwrap') > -1 ? true : false;
                if (!thisHasWrap && nextHasWrap) {
                    selected.nextSibling.setAttribute('class', 'piece');
                }
            }
            // Move selected to Set area from Mochigoma
            set.appendChild(selected);
        }

        posClass = getPosClassFromCoordinate(event);
        moveSelected(posClass);
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

    var attackSelect = function(event) {
        var posClass;
        
        if (!selected || selected.parentElement.className === 'mochi') {
            return;
        }
        
        posClass = getPosClassFromElement(event.target);
        moveSelected(posClass);
        moveToMochigoma(event.target);        
    };
    
    var setInitialPieces = function() {
        var classAttr, srcPath, p;

        for (var i = 0; i < def.init.length; i++) {
            p = document.createElement('img');

            srcPath = 'svg/' +  def.init[i].piece + '.svg';
            p.setAttribute('src', srcPath);

            classAttr = 'piece' + ' ' + def.init[i].pos;
            if (def.init[i].mine === false) {
                classAttr += ' oppoPiece';
            }
            p.setAttribute('class', classAttr);

            p.setAttribute('data-piece', def.init[i].piece);
            
            p.addEventListener('click', pieceSelect);

            set.appendChild(p);
        }
    };

    var main = function () {
        set = document.querySelector("#set");
        set.addEventListener('click', function(event) {
            if (event.target.id === 'board') {
                placeSelect(event);
            } else if (event.target.className.indexOf('oppoPiece') > -1) {
                attackSelect(event);
            } else {
                pieceSelect(event);
            }
        });

        setInitialPieces();
    };
    
    this.main = main;

}).call(this);
