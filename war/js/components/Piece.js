(function() {
    "use strict";

    var getElement = function(opts) {
	DomElem.apply(this, [opts.domSeed, opts.handler]);
    };

    var createElement = function(opts) {
	console.assert(opts.type);
	console.assert(typeof opts.owner === 'boolean');
	
	this.type = opts.type; // XXX need? or expose in better way
	this.owner = opts.owner;
	
	var img = document.createElement('img');
	var srcPath = ui.getSrcPath(opts.type);
	var classAttr = 'piece';
	
	if (opts.owner === Piece.OWNER.YOU) {
	    classAttr += ' oppoPiece';
	}
	
	img.setAttribute('src', srcPath);
	img.setAttribute('class', classAttr);
	img.setAttribute('data-piece', opts.type);
	
	if (opts.handler) {
	    img.addEventListener('click', opts.handler);
	}
	
	this.elem = img;
    };


    var Piece = function(opts) {
	if (opts.domSeed) {
	    getElement.call(this, opts);
	} else {
	    createElement.call(this, opts);
	}
    };

    Piece.prototype = Object.create(DomElem.prototype);
    Piece.prototype.constructor = Piece;

    Piece.TYPES = def.piece; // XXX include def.piece in this file? def shouldn't be global...

    Piece.OWNER = {
	ME: true,
	YOU: false
    };

    Piece.prototype.getId = function() {
	return this.elem.id; // XXX Object.defineProperty getter setter
    };

    Piece.prototype.select = function() {
	this.elem.style.transform = 'scale(1.2)';
    };

    Piece.prototype.deselect = function() {
	this.elem.style.transform = '';
    };


    this.Piece = Piece;

}).call(this);
