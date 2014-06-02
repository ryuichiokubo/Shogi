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
	var custoElems = document.querySelectorAll('.customize');
	var extraPieces = document.querySelectorAll("#extra .piece");
	var carousel = document.getElementById('extra');
	var setTipText = function(text) {
	    document.getElementById('customize-tip').textContent = text;
	}
	var startBtn = {
	    elem: document.getElementById('start'),
	    enable: function() {
		this.elem.disabled = false;
	    },
	    disable: function() {
		this.elem.disabled = true;
	    },
	    isEnabled: function() {
		return (this.elem.disabled === false);
	    }
	};

	var show = function() {
	    for (var i = 0; i < custoElems.length; i++) {
		custoElems[i].style.display = "block";
	    }
	};

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

	var extraPieceHandler = function(pieceClicked) {
	    var timer;

	    clearInterval(timer);
	    shakeReset();

	    setTipText("Put it on board.");

	    timer = setInterval(function() {
		shake(pieceClicked.target);
	    }, 200);
	    pieceClicked.target.setAttribute('class', 'piece shake-right');

	    ui.resetAvailable();

	    var selectedPiece = pieceClicked.target.id;
	    var initAvailPos = board.getInitAvailPos(selectedPiece);

	    var squareSelect = function(posClicked) {
		clearInterval(timer);
		shakeReset();

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

		if (selectedPiece === 'o') {
		    startBtn.enable();
		}

		if (startBtn.isEnabled()) {
		    setTipText("Add more or press Start.");
		} else {
		    setTipText("Add one King (王将).");
		}
	    };
	    for (var i = 0; i < initAvailPos.length; i++) {
		var initAvailClass = ui.util.convertPosNumToClass(initAvailPos[i][0], initAvailPos[i][1]);
		ui.setAvailable(initAvailClass, squareSelect);
	    }
	};

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

	show();

	for (var i = 0; i < extraPieces.length; i++) {
	    extraPieces[i].addEventListener('click', extraPieceHandler);
	}

	carousel.scrollLeft = 0;

	document.getElementById("carousel-left").addEventListener('click', function() {
	    scroll(60, false);
	});

	document.getElementById("carousel-right").addEventListener('click', function() {
	    scroll(60, true);
	});

	startBtn.elem.addEventListener('click', function() {
	    ui.resetAvailable();
	    startBtn.disable();
	    for (var i = 0; i < custoElems.length; i++) {
		custoElems[i].style.display = "none";
	    }
	    main.init();
	});
    };

    var menu = function () {
	var menuDialog = document.getElementById('menu');
	var board = document.getElementById('board');
	var mokume = document.getElementById('mokume');
	var standBtn = document.getElementById('stand-button');
	var custoBtn = document.getElementById('custo-button');

	var dismissMenu = function() {
	    menuDialog.style.display = "none";
	    board.style.display = "block";
	    mokume.style.display = "none";
	};

	standBtn.addEventListener('click', function() {
	    dismissMenu();
	    standard();
	});
	custoBtn.addEventListener('click', function() {
	    dismissMenu();
	    customize();
	});
    };

    this.menu = menu;

}).call(this);
