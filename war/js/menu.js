(function() {
    "use strict";

    var elems = {
	menuDialog: null,
	board: null,
	mokume: null,
	standBtn: null,
	custoBtn: null,

	setElems: function() {
	    this.menuDialog = new DomElem('menu');

	    this.board = new DomElem('board');

	    this.mokume = new DomElem('mokume');

	    this.standBtn = new DomElem('stand-button', function() {
	        dismissMenu();
	        main.activate();
	    });

	    this.custoBtn = new DomElem('custo-button', function() {
	        dismissMenu();
	        custom.activate();
	    });
	}
    };

    var dismissMenu = function() {
        elems.menuDialog.hide();
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
