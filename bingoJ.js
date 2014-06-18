var win = false;
var rand = 0;
var num = 0;
var winner = 0;
var B1 = [];
var I1 = [];
var G1 = [];
var N1 = [];
var O1 = [];
var BR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var IR = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var NR = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var GR = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
var OR = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
var all = [];
var all2 = [];
var guessList = [];
var guessCount = 0;
var guess = 0;
var myBoard = ['#B1', '#B2', '#B3', '#B4', '#B5',
    '#I1', '#I2', '#I3', '#I4', '#I5',
    '#N1', '#N2', '#N3', '#N4', '#N5',
    '#G1', '#G2', '#G3', '#G4', '#G5',
    '#O1', '#O2', '#O3', '#O4', '#O5',
];
var myBoard2 = ['#B6', '#B7', '#B8', '#B9', '#B10',
    '#I6', '#I7', '#I8', '#I9', '#I10',
    '#N6', '#N7', '#N8', '#N9', '#N10',
    '#G6', '#G7', '#G8', '#G9', '#G10',
    '#O6', '#O7', '#O8', '#O9', '#O10',
];
var miniArray = ['#mini1', '#mini6', '#mini11', '#mini16', '#mini21',
    '#mini2', '#mini7', '#mini12', '#mini17', '#mini22',
    '#mini3', '#mini8', '#mini13', '#mini18', '#mini23',
    '#mini4', '#mini9', '#mini14', '#mini19', '#mini24',
    '#mini5', '#mini10', '#mini15', '#mini20', '#mini25'
];
var miniArray2 = ['#miniA', '#miniF', '#miniK', '#miniP', '#miniU',
    '#miniB', '#miniG', '#miniL', '#miniQ', '#miniV',
    '#miniC', '#miniH', '#miniM', '#miniR', '#miniW',
    '#miniD', '#miniI', '#miniN', '#miniS', '#miniX',
    '#miniE', '#miniJ', '#miniO', '#miniT', '#miniY'
];
var allBool = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, true, false, false,
    false, false, false, false, false,
    false, false, false, false, false
];
var allBool2 = [false, false, false, false, false,
    false, false, false, false, false,
    false, false, true, false, false,
    false, false, false, false, false,
    false, false, false, false, false
];
/*fills in a board
takes in a position array*/
function genBoard(boardArray, alls) {
    for (i = 0; i < 25; i++) {
        rand = Math.random();
        num = (Math.round(rand * 14) + 1);
        if (i < 5) {

        } else if (i < 10) {
            num += 15;
        } else if (i < 15) {
            num += 30;
        } else if (i < 20) {
            num += 45;
        } else {
            num += 60;
        }
        for (j = 0; j < i; j++) {
            if (num === alls[j]) {
                j = 0;
                rand = Math.random();
                num = (Math.round(rand * 14) + 1);
                if (i < 5) {} else if (i < 10) {
                    num += 15;
                } else if (i < 15) {
                    num += 30;
                } else if (i < 20) {
                    num += 45;
                } else {
                    num += 60;
                }
            }
        }
        alls[i] = num;
    }
    for (i = 0; i < alls.length; i++) {
        if (i != 12) {
            $(boardArray[i]).html(alls[i]);
        }
    }
}
/*Changes the header to show the guess and places the guess into its proper guessed array
takes in the guess*/
function displayHead(num) {
    if (num < 16) {
        B1.push(num);
        for (var i = BR.length - 1; i >= 0; i--) {
            if (BR[i] === num) {
                BR.splice(i, 1);
            }
        }
        $('#header').html("B" + num);
    } else if (num < 31) {
        I1.push(num);
        for (var i = IR.length - 1; i >= 0; i--) {
            if (IR[i] === num) {
                IR.splice(i, 1);
            }
        }
        $('#header').html("I" + num);
    } else if (num < 46) {
        N1.push(num);
        for (var i = NR.length - 1; i >= 0; i--) {
            if (NR[i] === num) {
                NR.splice(i, 1);
            }
        }
        $('#header').html("N" + num);
    } else if (num < 61) {
        G1.push(num);
        for (var i = GR.length - 1; i >= 0; i--) {
            if (GR[i] === num) {
                GR.splice(i, 1);
            }
        }
        $('#header').html("G" + num);
    } else if (num < 76) {
        O1.push(num);
        for (var i = OR.length - 1; i >= 0; i--) {
            if (OR[i] === num) {
                OR.splice(i, 1);
            }
        }
        $('#header').html("O" + num);
    } else {
        console.log("i dont even know...");
    }
}
/*Used to show which numbers have been guessed
takes in a position array and a corresponding boolean array*/
function turnRed(array, array2) {
    for (i = 0; i < array.length; i++)
        if (array2[i] === true) {
            $(array[i]).css('background-color', 'red');
        }
}
/*Used in the reset function to clear background color
takes in a position array*/
function turnWhite(whites) {
    for (i = 0; i < whites.length; i++) {
        $(whites[i]).css('background-color', 'transparent');
    }
}
/*Adds a true value to the boolean array if necessary*/
function toTrue(a, al) {
    for (i = 0; i < al.length; i++) {
        if (num === al[i]) {
            a[i] = true;
            guess = i;
        }
    }
}
/*checks to see if there is a winning combination
takes in a  boolean array and a player name*/
function isWin(winArray, wins) {
    /*All B's*/
    if (winArray[0] === true && winArray[0] === winArray[1] && winArray[0] === winArray[2] && winArray[0] === winArray[3] && winArray[0] === winArray[4]) {
        win = true;
        console.log("All B's" + 1);
    } /*All I's*/
    else if (winArray[5] === true && winArray[5] === winArray[6] && winArray[5] === winArray[7] && winArray[5] === winArray[8] && winArray[5] === winArray[9]) {
        win = true;
        console.log("All I's" + 2);
    } /*All N's*/
    else if (winArray[10] === true && winArray[10] === winArray[11] && winArray[10] === winArray[12] && winArray[10] === winArray[13] && winArray[10] === winArray[14]) {
        win = true;
        console.log("All N's" + 3);
    } /*All G's*/
    else if (winArray[15] === true && winArray[15] === winArray[16] && winArray[15] === winArray[17] && winArray[15] === winArray[18] && winArray[15] === winArray[19]) {
        win = true;
        console.log("All G's" + 4);
    } /*All O's*/
    else if (winArray[20] === true && winArray[20] === winArray[21] && winArray[20] === winArray[22] && winArray[20] === winArray[23] && winArray[20] === winArray[24]) {
        win = true;
        console.log("All O's" + 5);
    } /*All 1's*/
    else if (winArray[0] === true && winArray[0] === winArray[5] && winArray[0] === winArray[10] && winArray[0] === winArray[15] && winArray[0] === winArray[20]) {
        win = true;
        console.log("All 1's" + 6);
    } /*All 2's*/
    else if (winArray[1] === true && winArray[1] === winArray[6] && winArray[1] === winArray[11] && winArray[1] === winArray[16] && winArray[1] === winArray[21]) {
        win = true;
        console.log("All 2's" + 7);
    } /*All 3's*/
    else if (winArray[2] === true && winArray[2] === winArray[7] && winArray[2] === winArray[12] && winArray[2] === winArray[17] && winArray[2] === winArray[22]) {
        win = true;
        console.log("All 3's" + 8);
    } /*All 4's*/
    else if (winArray[3] === true && winArray[3] === winArray[8] && winArray[3] === winArray[13] && winArray[3] === winArray[18] && winArray[3] === winArray[23]) {
        win = true;
        console.log("All 4's" + 9);
    } /*All 5's*/
    else if (winArray[4] === true && winArray[4] === winArray[9] && winArray[4] === winArray[14] && winArray[4] === winArray[19] && winArray[4] === winArray[24]) {
        win = true;
        console.log("All 5's" + 10);
    } /*Top right to bottom left*/
    else if (winArray[0] === true && winArray[0] === winArray[6] && winArray[0] === winArray[12] && winArray[0] === winArray[18] && winArray[0] === winArray[24]) {
        win = true;
        console.log("Tr to Bl" + 11);
    } /*Bottom left to top right*/
    else if (winArray[4] === true && winArray[4] === winArray[8] && winArray[4] === winArray[12] && winArray[4] === winArray[16] && winArray[4] === winArray[20]) {
        win = true;
        console.log("Br to Tl" + 12);
    }
    if (win === true) {
        winner = wins;
        console.log("I dont like this");
    }
}
/*Resets the boards and begins anew*/
function resetGame() {
    allBool = [false, false, false, false, false,
        false, false, false, false, false,
        false, false, true, false, false,
        false, false, false, false, false,
        false, false, false, false, false
    ];
    allBool2 = [false, false, false, false, false,
        false, false, false, false, false,
        false, false, true, false, false,
        false, false, false, false, false,
        false, false, false, false, false
    ];
    win = false;
    turnWhite(myBoard);
    turnWhite(myBoard2);
    turnWhite(miniArray);
    turnWhite(miniArray2);
    $('button').html("next");
    guessCount = 0;
    guessList = [];
    B1 = [];
    I1 = [];
    G1 = [];
    N1 = [];
    O1 = [];
    all = [];
    all2 = [];
    winner = 0;
    $('#mini13').css('background-color', 'red');
    $('#miniM').css('background-color', 'red');
    $('#N3').css('background-color', 'red');
    $('#N8').css('background-color', 'red');
    $('#header').html("Player 1");
    BR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    IR = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    NR = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    GR = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
    OR = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
    genBoard(myBoard, all);
    genBoard(myBoard2, all2);
}
$(document).ready(function() {
    genBoard(myBoard, all);
    genBoard(myBoard2, all2);
    $('button').click(function() {
        if (win === false) {
            rand = Math.random();
            num = Math.round(rand * 74) + 1;
            for (i = 0; i < guessList.length; i++) {
                if (num === guessList[i]) {
                    rand = Math.random();
                    num = Math.round(rand * 74) + 1;
                    i = 0;
                }
            }
            guessList[guessCount] = num;
            guessCount++;
            displayHead(num);
            $('#B').html("B " + B1.sort(function(a, b) {
                return a - b
            }));
            $('#I').html("I " + I1.sort());
            $('#N').html("N " + N1.sort());
            $('#G').html("G " + G1.sort());
            $('#O').html("O " + O1.sort());
            $('#BR').html("B " + BR);
            $('#IR').html("I " + IR);
            $('#NR').html("N " + NR);
            $('#GR').html("G " + GR);
            $('#OR').html("O " + OR);
            toTrue(allBool, all);
            toTrue(allBool2, all2);

            turnRed(miniArray, allBool);
            turnRed(myBoard, allBool);

            turnRed(myBoard2, allBool2);
            turnRed(miniArray2, allBool2);
            isWin(allBool, "Player 1");
            if (win === false) {
                isWin(allBool2, "Player 2");
            }
        }
        console.log("why");
        if (win === true) {
            $('button').html("Again?");
            $('#header').html(winner + " is the winner");
            $('button').click(function() {
                resetGame();
                console.log("this is a " + win);
            })
        }
    });
});