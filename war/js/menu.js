(function() {
    "use strict";

    var elems = {
	menuArea: null,
	board: null,
	mokume: null,
	standBtn: null,
	custoBtn: null,

	setElems: function() {
	    this.menuArea = new DomElem('menu');

	    this.board = new DomElem('board');

	    this.mokume = new DomElem('mokume');

	    this.standBtn = new Button('stand-button', function() {
	        dismissMenu();
	        main.setInitialPieces();
	        main.activate();
	    });

	    this.custoBtn = new Button('custo-button', function() {
	        dismissMenu();
	        custom.activate();
	    });
	}
    };

    var dismissMenu = function() {
        elems.menuArea.hide();
        elems.board.show();
        elems.mokume.hide();
    };

    var init = function () {
	elems.setElems();
    };


    this.menu = {
	init: init
    };

}).call(this);
