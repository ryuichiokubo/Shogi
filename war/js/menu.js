(function() {
    "use strict";

    var standard = function() {
        var setInitialPieces = function() {
            var posNum;

            for (var i = 0; i < def.init.length; i++) {
		ui.setPiece(def.init[i].piece, def.init[i].pos, def.init[i].mine, main.pieceSelect);

                posNum = ui.util.convertPosClassToNum(def.init[i].pos, def.init[i].mine);
                board.setPiece(posNum[0], posNum[1], def.init[i].piece, def.init[i].mine);
            }
        };
        setInitialPieces();
	main.init();
    };

    var customize = function() {
	// XXX cleaning...
	document.getElementById('customize').style.display = "block";

	var extraPieces = document.querySelectorAll("#extra .piece");
	var shake = function(elem) {
	    if (elem.getAttribute('class').indexOf('shake-right') > 0) {
	        elem.setAttribute('class', 'piece shake-left');
	    } else {
	        elem.setAttribute('class', 'piece shake-right');
	    }
	};
	var shakeReset = function() {
	    for (var i = 0; i < extraPieces.length; i++) {
		extraPieces[i].setAttribute('class', 'piece');
	    }
	};
	var timer;
	var extraPieceHandler = function(pieceClicked) {
	    clearInterval(timer);
	    shakeReset();

	    timer = setInterval(function() {
		shake(pieceClicked.target);
	    }, 200);
	    pieceClicked.target.setAttribute('class', 'piece shake-right');

	    ui.resetAvailable();

	    var initAvailPos = board.getInitAvailPos();

	    var squareSelect = function(posClicked) {
		clearInterval(timer);
		shakeReset();

		var selectedPiece = pieceClicked.target.id;
		var posClass = ui.util.getPosClassFromElement(posClicked.target);
		ui.setPiece(selectedPiece, posClass, true, main.pieceSelect);
                var posNum = ui.util.convertPosClassToNum(posClass, true);
                board.setPiece(posNum[0], posNum[1], selectedPiece, true);

		// add the same piece to opponent as well
		var oppoPosNum = [def.board.column - 1 - posNum[0], def.board.row - 1 - posNum[1]];
		var oppoPosClass = ui.util.convertPosNumToClass(oppoPosNum[0], oppoPosNum[1]);
                board.setPiece(oppoPosNum[0], oppoPosNum[1], selectedPiece, false);
		ui.setPiece(selectedPiece, oppoPosClass, false, main.pieceSelect);

		ui.resetAvailable();
	    };
	    for (var i = 0; i < initAvailPos.length; i++) {
		var initAvailClass = ui.util.convertPosNumToClass(initAvailPos[i][0], initAvailPos[i][1]);
		ui.setAvailable(initAvailClass, squareSelect);
	    }
	};

	for (var i = 0; i < extraPieces.length; i++) {
	    extraPieces[i].addEventListener('click', extraPieceHandler);
	}

	var carousel = document.getElementById('extra');
	carousel.scrollLeft = 0;
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
	document.getElementById("carousel-left").addEventListener('click', function() {
	    scroll(60, false);
	});
	document.getElementById("carousel-right").addEventListener('click', function() {
	    scroll(60, true);
	});

	document.getElementById("start").addEventListener('click', function() {
	    ui.resetAvailable();
	    document.querySelector("aside").style.display = 'none';
	    main.init();
	});
    };

    var menu = function () {
	var menuDialog = document.getElementById('menu');
	var startBtn = document.getElementById('start-button');
	var custoBtn = document.getElementById('custo-button');

	startBtn.addEventListener('click', function() {
	    menuDialog.style.display = "none";
	    standard();
	});
	custoBtn.addEventListener('click', function() {
	    menuDialog.style.display = "none";
	    customize();
	});
    };

    this.menu = menu;

}).call(this);
