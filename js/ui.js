(function() {
    "use strict";

    var ui = {

	set: null, // board area, not including mochigoma

	init: function() {
	    ui.set = document.querySelector("#set");
	},

	setPiece: function(piece, pos, mine, handler) {
	    var classAttr, srcPath, img;

	    img = document.createElement('img');

            srcPath = 'svg/' + piece + '.svg';

            classAttr = 'piece' + ' ' + pos;
            if (mine === false) {
                classAttr += ' oppoPiece';
            }

            img.setAttribute('src', srcPath);
            img.setAttribute('class', classAttr);
            img.setAttribute('data-piece', piece);
            img.addEventListener('click', handler);
            ui.set.appendChild(img);
	}
    };

    this.ui = ui;
    
}).call(this);
