(function() {
    "use strict";

    var squareSelect = function(posClicked) {
       elems.pieceClicked.deselect();
    
       var posClass = ui.util.getPosClassFromElement(posClicked.target);
       ui.setPiece(elems.pieceClicked.getId(), posClass, true, main.pieceSelect);
    
       var posNum = ui.util.convertPosClassToNum(posClass, true);
       board.setPiece(posNum[0], posNum[1], elems.pieceClicked.getId(), true);
    
       // add the same piece to opponent as well
       var oppoPosNum = [def.board.column - 1 - posNum[0], def.board.row - 1 - posNum[1]];
       var oppoPosClass = ui.util.convertPosNumToClass(oppoPosNum[0], oppoPosNum[1]);
       board.setPiece(oppoPosNum[0], oppoPosNum[1], elems.pieceClicked.getId(), false);
       ui.setPiece(elems.pieceClicked.getId(), oppoPosClass, false, main.pieceSelect);
    
       ui.resetAvailable();
    
       if (elems.pieceClicked.getId() === 'o') {
           elems.start.enable();
       }
    
       if (elems.start.isEnabled()) {
           elems.tip.setText("Add more or press Start.");
       } else {
           elems.tip.setText("Add one King (王将).");
       }
    };

    var extraPieceHandler = function(event) {

        elems.extraPieces.resetSelected();

	elems.pieceClicked = new DomElem(event.target); // XXX create class to handle event object?
	elems.pieceClicked.select();
    
        ui.resetAvailable();
    
        var initAvailPos = board.getInitAvailPos(elems.pieceClicked.getId());
    
        if (initAvailPos.length > 0) {
	   elems.tip.setText("Put it on board.");
        }
 
        for (var i = 0; i < initAvailPos.length; i++) {
	   var initAvailClass = ui.util.convertPosNumToClass(initAvailPos[i][0], initAvailPos[i][1]);
	   ui.setAvailable(initAvailClass, squareSelect);
        }
    };


    var elems = {
	custoAreas: null, // two divs above and below the board to show help text and extra pieces
	extraPieces: null,
	//carousel: null,
	start: null,
	tip: null,
	pieceClicked: null, // will have value when an extra piece is clicked

	setElems: function() {
	    this.custoAreas = new DomElem(document.querySelectorAll('.customize'));
	    this.extraPieces = new DomElem(document.querySelectorAll("#extra .piece"));
	    //this.carousel = new DomElem('extra');
	    this.start = new DomElem('start');
	    this.tip = new DomElem('customize-tip');
	},

	setListeners: function() { // XXX set listener when creating DomElem?
	    this.extraPieces.on('click', extraPieceHandler);

	    this.start.on('click', function() {
	        ui.resetAvailable(); // XXX ui ...
	        elems.start.disable();
	        elems.custoAreas.hide();
	        main.init(); // XXX not activate?
	    });
	}
    };

    var init = function() {
	elems.setElems();
	elems.setListeners();
    };

    var activate = function() {
	var carousel = document.getElementById('extra');

	var scroll = function(amount, toRight) {
	    var frame = 30;
	    var cntr = frame;
	    var timer = setInterval(function() {
		if (cntr > 0) {
		    if (toRight) {
			carousel.scrollLeft = carousel.scrollLeft + amount / frame;
		    } else {
			carousel.scrollLeft = carousel.scrollLeft - amount / frame;
		    }
		    cntr--;
		} else {
		    clearTimeout(timer);
		}
	    }, 15);
	};

	elems.custoAreas.show();

	carousel.scrollLeft = 0;

	document.getElementById("carousel-left").addEventListener('click', function() {
	    scroll(60, false);
	});

	document.getElementById("carousel-right").addEventListener('click', function() {
	    scroll(60, true);
	});
    };


    this.custom = {
	init: init,
	activate: activate
    };

}).call(this);
