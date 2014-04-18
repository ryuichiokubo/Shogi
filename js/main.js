/*jslint browser:true, indent:4 */
/*global initPieces*/

var main = function () {

    var i = 0;
    var set = document.querySelector(".set");    
    var classAttr = '';
    var srcPath = '';
    var p;
    for (i = 0; i < initPieces.length; i++) {
        
        console.log(initPieces[i]);
        
        p = document.createElement('img');
        
        srcPath = 'svg/' +  initPieces[i].piece + '.svg';
        p.setAttribute('src', srcPath);
        
        classAttr = 'piece' + ' ' + initPieces[i].pos;
        if (initPieces[i].mine === false) {
            classAttr += ' oppoPiece';
        }
        p.setAttribute('class', classAttr);

        set.appendChild(p);
    }

};

