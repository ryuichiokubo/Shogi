/*jslint browser:true, indent:4 */
/*global initPieces*/

(function() {
    
    var set; // board area, not including mochigoma
    var selected = null; // currently selected piece

    var rowNames = ['one', 'two', 'three', 'four',
                    'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 
                       'go', 'roku', 'nana', 'hachi', 'kyu'];

    var convertPosNumToClass = function(row, column) {
        return rowNames[row-1] + ' ' + columnNames[column-1];
    };

    var pieceSelect = function(event) {
        if (event.target.className.indexOf('oppoPiece') > -1) {
            return;
        }

        if (selected) {
            selected.style["background-color"] = '';
        }
        selected = event.target;
        event.target.style['background-color'] = 'rgba(255, 255, 0, 0.75)';
    };

    var moveSelected = function(posClass) {
        selected.setAttribute('class', 'piece ' + posClass);
        selected.style["background-color"] = '';
        selected = null;
    };

    var getPosClassFromCoordinate = function(event) {
        var x, y, row, column;
        
        x = event.offsetX;
        y = event.offsetY;
        row = Math.ceil(x / 60);
        column = Math.ceil(y / 60);
        return convertPosNumToClass(row, column);
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
    
    var getPosClassFromTarget = function(target) {
        var classes, rowHit, columnHit;
        
        classes = target.className.split(' ');
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
        
        posClass = getPosClassFromTarget(event.target);
        moveSelected(posClass);
        moveToMochigoma(event.target);        
    };
    
    var setInitialPieces = function() {
        var classAttr, srcPath, p;

        for (var i = 0; i < initPieces.length; i++) {
            p = document.createElement('img');

            srcPath = 'svg/' +  initPieces[i].piece + '.svg';
            p.setAttribute('src', srcPath);

            classAttr = 'piece' + ' ' + initPieces[i].pos;
            if (initPieces[i].mine === false) {
                classAttr += ' oppoPiece';
            }
            p.setAttribute('class', classAttr);

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
