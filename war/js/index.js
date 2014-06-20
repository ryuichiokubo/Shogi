(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
	ui.init(); // XXX this has help and reload --> move to somewhere
	game.init(); // XXX need this for custom mode

	// init views
	menu.init();
	custom.init();
	main.init();

    }, false);
})();
