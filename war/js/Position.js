(function() {
    "use strict";

    var rowNames = ['one', 'two', 'three', 'four', 'five'];
    var columnNames = ['ichi', 'ni', 'san', 'yon', 'go'];

    var fromNumber = function(x, y) {
	this.x = x;
	this.y = y;
    };

    var fromDom = function(dom) {
        var classes = dom.className.split(' ');
    
        for (var i = 0; i < classes.length; i++) {
            if (rowNames.indexOf(classes[i]) > -1) {
		this.x = rowNames.indexOf(classes[i]);
	    }
            if (columnNames.indexOf(classes[i]) > -1 ) {
		this.y = columnNames.indexOf(classes[i]);
	    }
        }
    };


    var Position = function(arg1, arg2) {

	if (typeof arg1 === 'number' && typeof arg2 === 'number') {
	    fromNumber.apply(this, arguments);

	} else if (!arg2 && arg1.className) {
	    fromDom.apply(this, arguments);
	}

	console.assert(typeof this.x === 'number' && typeof this.y === 'number');
    };

    Position.prototype.asArray = function() {
	return [this.x, this.y];
    };

    Position.prototype.asClassName = function() {
    	if (rowNames[this.x] && columnNames[this.y]) {
    	    return rowNames[this.x] + ' ' + columnNames[this.y];
    	} else {
	    // XXX should throw error?
    	    return false;
    	}
    };


    this.Position = Position;

}).call(this);
