(function() {
    "use strict";

    var rowNames = ['one', 'two', 'three', 'four', 'five'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 'go'];

    var Position = function(x, y) {
	// XXX take dom element (class name) as argument
	this.x = x;
	this.y = y;
    };

    Position.prototype.asArray = function() {
	return [this.x, this.y];
    };

    Position.prototype.asClassName = function() {
    	if (rowNames[this.x] && columnNames[this.y]) {
    	    return rowNames[this.x] + ' ' + columnNames[this.y];
    	} else {
	    // XXX should throw error
    	    return false;
    	}
    };


    this.Position = Position;

}).call(this);
