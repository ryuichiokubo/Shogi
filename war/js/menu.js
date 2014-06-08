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
	    this.standBtn = new DomElem('stand-button');
	    this.custoBtn = new DomElem('custo-button');
	},

	setListeners: function() {
	    this.standBtn.on('click', function() {
	        dismissMenu();
	        main.activate();
	    });

	    this.custoBtn.on('click', function() {
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
	elems.setListeners();
    };


    this.menu = {
	init: init
    };

}).call(this);
