(function() {
    "use strict";

    var ui = {

	set: null, // board area, not including mochigoma
	selected: null, // currently selected piece as DOM Element

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
	},

	setSelected: function(event) {
	    if (ui.selected) {
                ui.selected.style["background-color"] = '';
            }
            ui.selected = event.target;
            ui.selected.style['background-color'] = 'rgba(255, 255, 0, 0.75)';
	},

	resetAvailable: function() {
	    var availElems;

            availElems = ui.set.querySelectorAll(".available");
            for (var i = 0; i < availElems.length; i++) {
                ui.set.removeChild(availElems[i]);
            }
	}
    };

    this.ui = ui;
    
}).call(this);
