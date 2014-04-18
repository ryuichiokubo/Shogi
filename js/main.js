/*jslint browser:true, indent:4 */
/*global initPieces*/

var main = function () {

    var i;
    var classAttr = '';
    var srcPath = '';
    var p;
    var selected;
    
    var rowNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyu'];

    var getPosClass = function(row, column) {
        var res = rowNames[row-1] + ' ' + columnNames[column-1];
        
        return res;
    };
    
    var pieceSelect = function(event) {
        if (event.target.className.indexOf('oppoPiece') > -1) {
            return;
        }

        if (selected) {
            selected.style["background-color"] = '';
        }
        selected = event.target;
        event.target.style['background-color'] = 'yellow';
    };

    var set = document.querySelector("#set");
    set.addEventListener('click', function(event) {
        var x, y, row, column, posClass, classes, rowHit, columnHit;
        
        if (event.target.id === 'board') {
            // no piece where it is clicked
            x = event.offsetX;
            y = event.offsetY;
            row = Math.ceil(x / 60);
            column = Math.ceil(y / 60);
            posClass = getPosClass(row, column);
        } else {
            // piece is clicked
            
            if (event.target.className.indexOf('oppoPiece') > -1) {
                // opponent's piece
                classes = event.target.className.split(' ');
                for (i = 0; i < classes.length; i++) {
                    if (rowNames.indexOf(classes[i]) > -1) {
                        rowHit = rowNames[rowNames.indexOf(classes[i])];
                    }
                    if (columnNames.indexOf(classes[i]) > -1 ) {
                        columnHit = columnNames[columnNames.indexOf(classes[i])];
                    }
                }
                posClass = rowHit + ' ' + columnHit;

                // move to my mochigoma
                if (selected) {
                    var myMochi = document.querySelector("#myMochi");
                    event.target.setAttribute('class', 'piece');
                    myMochi.appendChild(event.target);
                }
            } else {
                // my piece
                pieceSelect(event);
            }
        }

        if (selected && posClass) {
            if (selected.parentElement.className === 'mochi') {
                set.appendChild(selected);
            }
            selected.setAttribute('class', 'piece ' + posClass);
            selected.style["background-color"] = '';
            selected = null;
        }

    });

    
    for (i = 0; i < initPieces.length; i++) {
    
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

