(function() {
    "use strict";

    // Definition
    //

    // Character of each piece
    //
    // move:    array of available position relative to current position
    //          [x, y, anywhere in this direction]
    var piece = {
        hu: {
            move: [[0, -1]],
            prom: 'tokin'
        },
        kyosha: {
            move: [[0, -1, true]],
            prom: 'narikyo'
        },
        keima: {
            move: [[-1, -2], [1, -2]],
            prom: 'narikei'
        },
        tetsu: {
            move: [[-1, -1], [0, -1], [1, -1]],
            prom: 'naritetsu'
        },
        dou: {
            move: [[-1, -1], [0, -1], [1, -1], [0, 1]],
            prom: 'naridou'
        },
        gin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 1], [1, 1]],
            prom: 'narigin'
        },
        kin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
        },
        o: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]],
        },
        hisha: {
            move: [[0, -1, true], [1, 0, true], [0, 1, true], [-1, 0, true]],
            prom: 'ryu'
        },
        kaku: {
            move: [[-1, -1, true], [1, -1, true], [-1, 1, true], [1, 1, true]],
            prom: 'uma'
        },
	kirin: {
	    move: [[0, -2], [1, -1], [2, 0], [1, 1], [0, 2], [-1, 1], [-2, 0], [-1, -1]],
	    prom: 'shishi'
	},
	houou: {
	    move: [[-2, -2], [2, -2], [2, 2], [-2, 2], [0, -1], [1, 0], [0, 1], [-1, 0]],
	    prom: 'honou'
	},
        tokin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'hu'
        },
        narikyo: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'kyosha'
        },
        narikei: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'keima'
        },
        naritetsu: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'tetsu'
        },
        naridou: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'dou'
        },
        narigin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            dem: 'gin'
        },
        ryu: {
            move: [[0, -1, true], [1, 0, true], [0, 1, true], [-1, 0, true], [-1, -1], [1, -1], [-1, 1], [1, 1]],
            dem: 'hisha'
        },
        uma: {
            move: [[-1, -1, true], [1, -1, true], [-1, 1, true], [1, 1, true], [0, -1], [1, 0], [0, 1], [-1, 0]],
            dem: 'kaku'
        },
	honou: {
	    move: [[-1, -1, true], [0, -1, true], [1, -1, true], [1, 0, true], [1, 1, true], [0, 1, true], [-1, 1, true], [-1, 0, true]],
	    dem: 'houou'
	},
	shishi: {
	    move: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-2, -2], [0, -2], [2, -2], [2, 0], [2, 2], [0, 2], [-2, 2], [-2, 0], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]],
	    dem: 'kirin'
	}
    };


    // Board setting
    var board = {
	row: 5,
	column: 5,
	promoteRow: 2, // piece can promote if in opponent's side within this row
	ownRow: 2 // users can put his initial pieces within this area
    };


    // Initial pieces and their position
    var init = [
        {
            piece: 'hu',
            pos: 'one yon',
            mine: true
        },
        {
            piece: 'o',
            pos: 'one go',
            mine: true
        },
        {
            piece: 'kin',
            pos: 'two go',
            mine: true
        },
        {
            piece: 'gin',
            pos: 'three go',
            mine: true
        },
        {
            piece: 'kaku',
            pos: 'four go',
            mine: true
        },
        {
            piece: 'hisha',
            pos: 'five go',
            mine: true
        },
        {
            piece: 'hisha',
            pos: 'one ichi',
            mine: false
        },
        {
            piece: 'kaku',
            pos: 'two ichi',
            mine: false
        },
        {
            piece: 'gin',
            pos: 'three ichi',
            mine: false
        },
        {
            piece: 'kin',
            pos: 'four ichi',
            mine: false
        },
        {
            piece: 'o',
            pos: 'five ichi',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'five ni',
            mine: false
        }
    ];

    this.def = {
        piece: piece,
	board: board,
        init: init
    };
    
}).call(this);
