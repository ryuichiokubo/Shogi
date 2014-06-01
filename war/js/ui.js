(function() {
    "use strict";

    // DOM handling view

    var rowNames = ['one', 'two', 'three', 'four', 'five'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 'go'];

    var elems = {
	set: null // board area element, not including inhand area
    };

    var ui = {

	selected: null, // currently selected piece as DOM Element // XXX as object with method?

	init: function() {
	    var refreshBtn = document.getElementById('refresh');
	    var questionBtn = document.getElementById('question');
	    var helpEl = document.getElementById('help');

	    refreshBtn.addEventListener('click', function() {
		document.location.reload(true);
	    });

	    questionBtn.addEventListener('click', function() {
		if (helpEl.style.display === 'block') {
		    helpEl.style.display = "none";
		    refreshBtn.style.display = "block";
		} else {
		    helpEl.style.display = "block";
		    refreshBtn.style.display = "none";
		}
	    });

	    elems.set = document.querySelector("#set");
	},

	getSrcPath: function(type) {
	    var path;

	    // cf. css width for #set
	    //if (window.document.body.clientWidth * 0.95 < 540) { // resized below this width
	    //if (window.document.body.clientWidth * 0.95 < 400) {
	    //    type = 'small/' + type; // XXX no longer needed with 5 x 5 board
	    //}
            path = 'svg/' + type + '.svg';
	    return path;
	},

	setPiece: function(piece, pos, mine, handler) {
	    var classAttr, srcPath, img;

	    img = document.createElement('img');

	    srcPath = ui.getSrcPath(piece);

            classAttr = 'piece' + ' ' + pos;
            if (mine === false) {
                classAttr += ' oppoPiece';
            }

            img.setAttribute('src', srcPath);
            img.setAttribute('class', classAttr);
            img.setAttribute('data-piece', piece);
	    if (handler) {
		img.addEventListener('click', handler);
	    }
            elems.set.appendChild(img);
	},

	getPiece: function(x, y) {
	    var pos = "." + rowNames[x] + "." + columnNames[y];
            return document.querySelector(pos);
	},

	removePiece: function(x, y) {
	    var pos = "." + rowNames[x] + "." + columnNames[y];
            var piece = document.querySelector(pos);
	    if (piece) {
		elems.set.removeChild(piece);
	    }
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
	    return util.getTypeFromElem(ui.selected);
	},

	isSelectedInhand: function() {
	    return (ui.selected.parentElement.className === 'inhand');
	},

	moveToHand: function(piece, mine) {
            var handAreaId, handArea, newClass, targetSrc, inserted;

	    ui.demote(piece);

	    if (mine) {
		handAreaId = "#myMochi";
		newClass = 'piece';
	    } else {
		handAreaId = "#oppoMochi";
		newClass = 'piece oppoPiece';
	    }
            handArea = document.querySelector(handAreaId);
            piece.setAttribute('class', newClass);

            if (handArea.children) {
                // Put same kind of pieces on top of existing pieces
                targetSrc = piece.getAttribute('src');

                for (var i = 0; i < handArea.children.length; i++) {
                    if (handArea.children[i].getAttribute('src') === targetSrc) {
                        inserted = handArea.insertBefore(piece, handArea.children[i+1]);
                        inserted.setAttribute('class', newClass + ' overwrap');
                    }
                }
            }
            if (!inserted) {
                // Put new kind of piece next to existing one or at the beginning
                handArea.appendChild(piece);
            }
        },

	prepareInhandMove: function(elem, isCaptive) {
	    var thisHasWrap, nextHasWrap, newClass;

            // Keep left-most piece of same kind without 'overwrap'
            if (elem.nextElementSibling) {
                thisHasWrap = util.hasClass(elem, 'overwrap') ? true : false;
                nextHasWrap = util.hasClass(elem.nextElementSibling, 'overwrap') ? true : false;
                if (!thisHasWrap && nextHasWrap) {
		    newClass = 'piece';
		    if (isCaptive) {
			newClass += ' oppoPiece';
		    }
                    elem.nextSibling.setAttribute('class', newClass);
                }
            }

	    if (!isCaptive) { // XXX organize better
		// Move selected to Set area from Mochigoma
            	elems.set.appendChild(elem);
	    }
	},

	removeCaptive: function(type, mine) {
	    var captive, oppoMochi;

	    if (mine){
		console.warn("removeCaptive: removing player's captive is not considered, may not work.");
	    }

            captive = document.querySelector("#oppoMochi>.piece[data-piece=" + type + "]");
	    ui.prepareInhandMove(captive, true);
	    
	    if (captive) {
		oppoMochi = document.querySelector("#oppoMochi");
		oppoMochi.removeChild(captive);
	    } else {
		console.error("removeCaptive: captive to remove not found. type=" . type);
	    }
	},

	moveSelected: function(newPosClass) {
	    // move selected and remove color
	    ui.selected.setAttribute('class', 'piece ' + newPosClass);
	    ui.selected.style["background-color"] = '';
	    ui.selected = null;
	},

	changePieceType: function(piece, changeTo) {
	    var srcPath;

	    srcPath = ui.getSrcPath(changeTo);
            piece.setAttribute('src', srcPath);
	    piece.setAttribute('data-piece', changeTo);
	},

	promote: function(piece, type) {
	    var prom;

	    type = type || util.getTypeFromElem(piece);
	    prom = def.piece[type].prom;

	    if (prom) {
		ui.changePieceType(piece, prom);
	    }
	},

	demote: function(piece, type) {
	    var dem;

	    type = type || util.getTypeFromElem(piece);
	    dem = def.piece[type].dem;

	    if (dem) {
		ui.changePieceType(piece, dem);
	    }
	}
    };


    var dialog = {

	askPromote: function() {
	    // return boolean to promote or not
	    return confirm('Promote?');
	},

	win: function() {
	    alert("You won!!");
	},

	lose: function() {
	    alert("You lost...");
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
    	},

	getTypeFromElem: function(elem) {
	    return elem.getAttribute('data-piece');
	}
	
    };


    ui.util = util;
    ui.dialog = dialog;
    this.ui = ui;
    
}).call(this);
