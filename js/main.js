/*jslint browser:true, indent:4 */
/*global initPieces*/

var main = function () {

    var i = 0;
    var classAttr = '';
    var srcPath = '';
    var p;
    var selected;
    
    var getPosClass = function(row, column) {
        var rowNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        var columnNames = ['ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyu'];
        var res = rowNames[row-1] + ' ' + columnNames[column-1];
        
        return res;
    };
    
    var set = document.querySelector(".set");
    set.addEventListener('click', function(event) {
        var x, y, row, column, posClass;
        console.log(event);

        if (event.target.className === 'board') {
            x = event.offsetX;
            y = event.offsetY;
            row = Math.ceil(x / 60);
            column = Math.ceil(y / 60);
            posClass = getPosClass(row, column);

            if (selected) {
                selected.setAttribute('class', 'piece ' + posClass);
            }
        }

    });

    
    var pieceSelect = function(event) {
        selected = event.target;
        event.target.style['background-color'] = 'yellow';
    };

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

