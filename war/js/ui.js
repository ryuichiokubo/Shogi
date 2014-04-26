(function() {
    "use strict";

    // DOM handling view

    var rowNames = ['one', 'two', 'three', 'four',
                    'five', 'six', 'seven', 'eight', 'nine'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 
                       'go', 'roku', 'nana', 'hachi', 'kyu'];

    var elems = {
	set: null // board area element, not including inhand area
    };

    var ui = {

	selected: null, // currently selected piece as DOM Element // XXX as object with method?

	init: function() {
	    elems.set = document.querySelector("#set");
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
            elems.set.appendChild(img);
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
	    elems.set.appendChild(div);
	},

	resetAvailable: function() {
	    var availElems;

            availElems = elems.set.querySelectorAll(".available");
            for (var i = 0; i < availElems.length; i++) {
                elems.set.removeChild(availElems[i]);
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
                var thisHasWrap = util.hasClass(ui.selected, 'overwrap') ? true : false;
                var nextHasWrap = util.hasClass(ui.selected.nextElementSibling, 'overwrap') ? true : false;
                if (!thisHasWrap && nextHasWrap) {
                    ui.selected.nextSibling.setAttribute('class', 'piece');
                }
            }
            // Move selected to Set area from Mochigoma
            elems.set.appendChild(ui.selected);
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


    var util = {
    
	// Num: indexed from 0, Class: indexed from 'one' or 'ichi'
	convertPosNumToClass: function(row, column) {
    	    if (rowNames[row] && columnNames[column]) {
    	        return rowNames[row] + ' ' + columnNames[column];
    	    } else {
    	        return false;
    	    }
    	},

	convertPosClassToNum: function(posClass) {
    	    var posClassArr, rowName, columnName, rowNum, columnNum;
    	    
    	    posClassArr = posClass.split(' ');
    	    rowName = posClassArr[0];
    	    columnName = posClassArr[1];
    	    rowNum = rowNames.indexOf(rowName);
    	    columnNum = columnNames.indexOf(columnName);
    	    
    	    return [rowNum, columnNum];
    	},

	getPosClassFromElement: function(element) {
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
    	},

	hasClass: function(element, className) {
    	    return (element.className.indexOf(className) > -1);
    	}
    };


    ui.util = util;
    ui.dialog = dialog;
    this.ui = ui;
    
}).call(this);
