(function() {
    "use strict";

    var squareSelect = function(event) {
       elems.pieceClicked.deselect();
    
       var pos = new Position(event.target);
       var piece = new Piece({
	   type: elems.pieceClicked.getId(),
	   owner: Piece.OWNER.ME,
	   handler: main.pieceSelect
       });

       elems.board.setPiece(pos, piece);
       game.setPiece(pos.x, pos.y, piece.type, piece.owner); // XXX game should also take objects, not raw values
    
       // add the same piece to opponent as well
       var youPos = new Position(def.board.column - 1 - pos.x, def.board.row - 1 - pos.y);
       var youPiece = new Piece({
	   type: piece.type,
	   owner: Piece.OWNER.YOU,
	   handler: main.pieceSelect
       });

       elems.board.setPiece(youPos, youPiece);
       game.setPiece(youPos.x, youPos.y, youPiece.type, youPiece.owner);
    
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

	elems.pieceClicked = new Piece({domSeed: event.target}); // XXX create class to handle event object?
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
		this.extraPieces.push(new Piece({domSeed: tmpDoms[i], handler: extraPieceHandler}));
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
