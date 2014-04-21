(function() {
    "use strict";

    // move:    array of available position relative to current position
    //          [x, y, anywhere in this direction]
    var piece = {
        hu: {
            move: [[0, -1]],
            nari: 'tokin'
        },
        kyosha: {
            move: [[0, -1, true]],
            nari: 'narikyo'
        },
        keima: {
            move: [[-1, -2], [1, -2]],
            nari: 'narikei'
        },
        gin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 1], [1, 1]],
            nari: 'narigin'
        },
        kin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            nari: ''
        },
        o: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]],
            nari: ''
        },
        hisha: {
            move: [[0, -1, true], [1, 0, true], [0, 1, true], [-1, 0, true]],
            nari: 'ryu'
        },
        kaku: {
            move: [[-1, -1, true], [1, -1, true], [-1, 1, true], [1, 1, true]],
            nari: 'uma'
        },
        tokin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            nari: ''
        },
        narikyo: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            nari: ''
        },
        narikei: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            nari: ''
        },
        narigin: {
            move: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
            nari: ''
        },
        ryu: {
            move: [[0, -1, true], [1, 0, true], [0, 1, true], [-1, 0, true], [-1, -1], [1, -1], [-1, 1], [1, 1]],
            nari: ''
        },
        uma: {
            move: [[-1, -1, true], [1, -1, true], [-1, 1, true], [1, 1, true], [0, -1], [1, 0], [0, 1], [-1, 0]],
            nari: ''
        },
    };

    var init = [
        {
            piece: 'hu',
            pos: 'one nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'two nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'three nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'four nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'five nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'six nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'seven nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'eight nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'nine nana',
            mine: true
        },
        {
            piece: 'hu',
            pos: 'one san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'two san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'three san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'four san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'five san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'six san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'seven san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'eight san',
            mine: false
        },
        {
            piece: 'hu',
            pos: 'nine san',
            mine: false
        },
        {
            piece: 'o',
            pos: 'five kyu',
            mine: true
        },
        {
            piece: 'o',
            pos: 'five ichi',
            mine: false
        },
        {
            piece: 'kin',
            pos: 'four kyu',
            mine: true
        },
        {
            piece: 'kin',
            pos: 'six kyu',
            mine: true
        },
        {
            piece: 'kin',
            pos: 'four ichi',
            mine: false
        },
        {
            piece: 'kin',
            pos: 'six ichi',
            mine: false
        },
        {
            piece: 'gin',
            pos: 'three kyu',
            mine: true
        },
        {
            piece: 'gin',
            pos: 'seven kyu',
            mine: true
        },
        {
            piece: 'gin',
            pos: 'three ichi',
            mine: false
        },
        {
            piece: 'gin',
            pos: 'seven ichi',
            mine: false
        },
        {
            piece: 'keima',
            pos: 'two kyu',
            mine: true
        },
        {
            piece: 'keima',
            pos: 'eight kyu',
            mine: true
        },
        {
            piece: 'keima',
            pos: 'two ichi',
            mine: false
        },
        {
            piece: 'keima',
            pos: 'eight ichi',
            mine: false
        },
        {
            piece: 'kyosha',
            pos: 'one kyu',
            mine: true
        },
        {
            piece: 'kyosha',
            pos: 'nine kyu',
            mine: true
        },
        {
            piece: 'kyosha',
            pos: 'one ichi',
            mine: false
        },
        {
            piece: 'kyosha',
            pos: 'nine ichi',
            mine: false
        }, 
        {
            piece: 'hisha',
            pos: 'eight hachi',
            mine: true
        },
        {
            piece: 'hisha',
            pos: 'two ni',
            mine: false
        },
        {
            piece: 'kaku',
            pos: 'two hachi',
            mine: true
        },
        {
            piece: 'kaku',
            pos: 'eight ni',
            mine: false
        }    
    ];

    this.def = {
        piece: piece,
        init: init
    };
    
}).call(this);
