(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
	ui.init(); // XXX this have help and reload --> move to somewhere
	board.init(); // XXX need this for custom mode

	menu.init();
	custom.init();

    }, false);
})();
