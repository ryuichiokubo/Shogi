(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
	ui.init();
	board.init(); // XXX need this for custom mode

	menu.init();
	// XXX standard.init(); custom.init() ...

    }, false);
})();
