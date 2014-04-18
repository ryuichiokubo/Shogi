/*jslint browser:true, indent:4 */
/*global initPieces*/

var main = function () {

    var i = 0;
    var set = document.querySelector(".set");    
    var hu = [];
    var classAttr = '';
    var srcPath = '';
    for (i = 0; i < initPieces.length; i++) {
        
        console.log(initPieces[i]);
        
        hu[i] = document.createElement('img');
        
        srcPath = 'svg/' +  initPieces[i].piece + '.svg';
        hu[i].setAttribute('src', srcPath);
        
        classAttr = 'piece' + ' ' + initPieces[i].pos;
        if (initPieces[i].mine === false) {
            classAttr += ' oppoPiece';
        }
        hu[i].setAttribute('class', classAttr);

        set.appendChild(hu[i]);
    }

};

