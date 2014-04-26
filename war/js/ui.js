(function() {
    "use strict";

    // DOM handling view

    var ui = {

	set: null, // board area element, not including inhand area
	selected: null, // currently selected piece as DOM Element // XXX as object with method?

	init: function() {
	    ui.set = document.querySelector("#set");
	},

	hasClass: function(element, className) {
    	    return (element.className.indexOf(className) > -1);
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

	setAvailable: function(availClass, handler) {
	    var div;

	    div = document.createElement('div');
	    div.setAttribute('class', 'available ' + availClass);
	    div.addEventListener('click', handler);
	    ui.set.appendChild(div);
	},

	resetAvailable: function() {
	    var availElems;

            availElems = ui.set.querySelectorAll(".available");
            for (var i = 0; i < availElems.length; i++) {
                ui.set.removeChild(availElems[i]);
            }
	},

	getSelectedType: function() {
	    return ui.selected.getAttribute('data-piece');
	},

	isSelectedInhand: function() {
	    return (ui.selected.parentElement.className === 'inhand');
	},

	moveToHand: function(target) {
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
        },

	prepareInhandMove: function() {
            // Keep left-most piece of same kind without 'overwrap'
            if (ui.selected.nextElementSibling) {
                var thisHasWrap = ui.hasClass(ui.selected, 'overwrap') ? true : false;
                var nextHasWrap = ui.hasClass(ui.selected.nextElementSibling, 'overwrap') ? true : false;
                if (!thisHasWrap && nextHasWrap) {
                    ui.selected.nextSibling.setAttribute('class', 'piece');
                }
            }
            // Move selected to Set area from Mochigoma
            ui.set.appendChild(ui.selected);
	},

	moveSelected: function(newPosClass) {
	    // move selected and remove color
	    ui.selected.setAttribute('class', 'piece ' + newPosClass);
	    ui.selected.style["background-color"] = '';
	    ui.selected = null;
	},

	promote: function(type) {
	    var srcPath;

            srcPath = 'svg/' +  def.piece[type].prom + '.svg';
            ui.selected.setAttribute('src', srcPath);
	    ui.selected.setAttribute('data-piece', def.piece[type].prom);
	}
    };


    var dialog = {

	askPromote: function() {
	    // return boolean to promote or not
	    return confirm('Promote?');
	},

	win: function() {
	    alert("You won!!");
	}
    };


    ui.dialog = dialog;
    this.ui = ui;
    
}).call(this);
