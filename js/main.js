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
        event.target.style['background-color'] = 'rgba(255, 255, 0, 0.75)';
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
                    var inserted;
                    event.target.setAttribute('class', 'piece');
                    
                    if (myMochi.children) {
                        var tmp = event.target.getAttribute('class');

                        for (i = 0; i < myMochi.children.length; i++) {
                            if (myMochi.children[i].getAttribute('src') === event.target.getAttribute('src')) {
                                inserted = myMochi.insertBefore(event.target, myMochi.children[i+1]);
                                inserted.setAttribute('class', tmp + ' ' + 'overwrap');
                            }
                        }
                    }
                    if (!inserted) {
                        myMochi.appendChild(event.target);
                    }
                }
            } else {
                // my piece
                pieceSelect(event);
            }
        }

        if (selected && posClass) {
            if (selected.parentElement.className === 'mochi') {
                if (selected.nextElementSibling) {
                    var thisHasWrap = selected.className.indexOf('overwrap') > -1 ? true : false;
                    var nextHasWrap = selected.nextElementSibling.className.indexOf('overwrap') > -1 ? true : false;
                    if (!thisHasWrap && nextHasWrap) {
                        selected.nextSibling.setAttribute('class', 'piece');
                    }
                }
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

