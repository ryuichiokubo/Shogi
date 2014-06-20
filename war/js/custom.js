(function() {
    "use strict";

    var squareSelect = function(posClicked) {
       elems.pieceClicked.deselect();
    
       var posClass = ui.util.getPosClassFromElement(posClicked.target);
       ui.setPiece(elems.pieceClicked.getId(), posClass, true, main.pieceSelect);
    
       var posNum = ui.util.convertPosClassToNum(posClass, true);
       game.setPiece(posNum[0], posNum[1], elems.pieceClicked.getId(), true);
    
       // add the same piece to opponent as well
       var oppoPosNum = [def.board.column - 1 - posNum[0], def.board.row - 1 - posNum[1]];
       var oppoPosClass = ui.util.convertPosNumToClass(oppoPosNum[0], oppoPosNum[1]);
       game.setPiece(oppoPosNum[0], oppoPosNum[1], elems.pieceClicked.getId(), false);
       ui.setPiece(elems.pieceClicked.getId(), oppoPosClass, false, main.pieceSelect);
    
       elems.board.resetAvailable();
    
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

        elems.extraPieces.forEach(function(elem) {
	    elem.deselect();
	});

	elems.pieceClicked = new Piece(event.target); // XXX create class to handle event object?
	elems.pieceClicked.select();
    
        elems.board.resetAvailable();
    
	// initially available position
        var initAvailPos = game.getInitAvailPos(elems.pieceClicked.getId());
    
        if (initAvailPos.length > 0) {
	   elems.tip.setText("Put it on board.");
 
	    for (var i = 0; i < initAvailPos.length; i++) {
		elems.board.setAvailable(initAvailPos[i], squareSelect);
	    }
        }
    };


    var elems = {
	board: null,
	custoAreas: [], // two divs above and below the board to show help text and extra pieces
	extraPieces: [],
	carousel: null,
	carouselLeft: null,
	carouselRight: null,
	start: null,
	tip: null,
	pieceClicked: null, // will have value when an extra piece is clicked

	setElems: function() {
	    var tmpDoms, i;

	    this.board = board;

	    tmpDoms = document.querySelectorAll('.customize');
	    for (i = 0; i < tmpDoms.length; i++) {
		this.custoAreas.push(new DomElem(tmpDoms[i]));
	    }

	    tmpDoms = document.querySelectorAll('#extra .piece');
	    for (i = 0; i < tmpDoms.length; i++) {
		this.extraPieces.push(new Piece(tmpDoms[i], extraPieceHandler));
	    }

	    this.carousel = new Carousel('extra', null);

	    this.carouselLeft = new Button('carousel-left', function() {
		elems.carousel.scrollMove(60, true);
	    });

	    this.carouselRight = new Button('carousel-right', function() {
		elems.carousel.scrollMove(60);
	    });

	    this.start = new Button('start', function() {
	        elems.board.resetAvailable();
	        elems.start.disable();
	        elems.custoAreas.forEach(function(elem) {
		    elem.hide();
		});
	        main.init(); // XXX not activate?
	    });

	    this.tip = new DomElem('customize-tip');
	}
    };

    var init = function() {
	elems.setElems();
	elems.carousel.scrollSet(0);
    };

    var activate = function() {
	elems.custoAreas.forEach(function(elem) {
	    elem.show();
	});
    };


    this.custom = {
	init: init,
	activate: activate
    };

}).call(this);
