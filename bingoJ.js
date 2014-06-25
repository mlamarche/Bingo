var win = false;
var start = true;
var rand = 0;
var num = 0;
var winner = 0;
var winCount = 0;
var playerArray = [];
var leaders = [];
var text = 0;
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
var guessList = [];
var guessCount = "";

function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getName() {
    text = "";
    $('#inputtext').val('');
    $('#myModal').on('shown.bs.modal', function() {
        $('#inputtext').focus();
    })

    $('#addbutton').on("click", function() {

        text = $('#inputtext').val();

        console.log(text);
        if (text != "") {
            newPlayer();
        }
        $('#inputtext').val('');
    })
    $('#inputtext').on("keydown", function(e) {
        if (e.keyCode === 13) {
            text = $('#inputtext').val();

            console.log(text);
            if (text != "") {
                newPlayer();
            }
            $('#inputtext').val('');
            $('#myModal').modal('hide');
        }
    })

}

function newPlayer() {
    //var newName = prompt("What is your player name?");
    var newName = text;
    text = 0;
    var playerIDs = createGuid();
    // console.log(newName);
    var player = {
        playerName: newName,
        playerID: playerIDs,
        playerBoard: ['#B1_' + playerIDs, '#B2_' + playerIDs, '#B3_' + playerIDs, '#B4_' + playerIDs, '#B5_' + playerIDs,
            '#I1_' + playerIDs, '#I2_' + playerIDs, '#I3_' + playerIDs, '#I4_' + playerIDs, '#I5_' + playerIDs,
            '#N1_' + playerIDs, '#N2_' + playerIDs, '#N3_' + playerIDs, '#N4_' + playerIDs, '#N5_' + playerIDs,
            '#G1_' + playerIDs, '#G2_' + playerIDs, '#G3_' + playerIDs, '#G4_' + playerIDs, '#G5_' + playerIDs,
            '#O1_' + playerIDs, '#O2_' + playerIDs, '#O3_' + playerIDs, '#O4_' + playerIDs, '#O5_' + playerIDs,
        ],
        playerMini: ['#mini1_' + playerIDs, '#mini6_' + playerIDs, '#mini11_' + playerIDs, '#mini16_' + playerIDs, '#mini21_' + playerIDs,
            '#mini2_' + playerIDs, '#mini7_' + playerIDs, '#mini12_' + playerIDs, '#mini17_' + playerIDs, '#mini22_' + playerIDs,
            '#mini3_' + playerIDs, '#mini8_' + playerIDs, '#mini13_' + playerIDs, '#mini18_' + playerIDs, '#mini23_' + playerIDs,
            '#mini4_' + playerIDs, '#mini9_' + playerIDs, '#mini14_' + playerIDs, '#mini19_' + playerIDs, '#mini24_' + playerIDs,
            '#mini5_' + playerIDs, '#mini10_' + playerIDs, '#mini15_' + playerIDs, '#mini20_' + playerIDs, '#mini25_' + playerIDs
        ],
        playerBool: [false, false, false, false, false,
            false, false, false, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ],
        playerAll: [],
        playerWin: false,
        playerNumWins: 0,
        playerBody: "white",
        playerLine: "black",
        playerFont: "gray",
        playerShade: "red"
    }

    var user = ich.user(player);
    var userBoard = ich.userBoard(player);
    var leaderBoard = ich.leaderBoard(player);
    genBoard(player.playerBoard, player.playerAll);
    $("#Opponents").append(user);
    $("#boards").append(userBoard);
    $("#leaders").append(leaderBoard);
    playerArray[playerArray.length] = player;
    start = true;
}
/*fills in a board
takes in a position array*/
function genBoard(boardArray, alls) {
    for (w = 0; w < 25; w++) {
        rand = Math.random();
        num = (Math.round(rand * 14) + 1);
        if (w < 5) {

        } else if (w < 10) {
            num += 15;
        } else if (w < 15) {
            num += 30;
        } else if (w < 20) {
            num += 45;
        } else {
            num += 60;
        }
        for (j = 0; j < w; j++) {
            if (num === alls[j]) {
                j = 0;
                rand = Math.random();
                num = (Math.round(rand * 14) + 1);
                if (w < 5) {} else if (w < 10) {
                    num += 15;
                } else if (w < 15) {
                    num += 30;
                } else if (w < 20) {
                    num += 45;
                } else {
                    num += 60;
                }
            }
        }
        alls[w] = num;
    }
    for (q = 0; q < alls.length; q++) {
        if (q != 12) {
            $(boardArray[q]).html(alls[q]);
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
        $('#miniHeader').html("B" + num);
    } else if (num < 31) {
        I1.push(num);
        for (var i = IR.length - 1; i >= 0; i--) {
            if (IR[i] === num) {
                IR.splice(i, 1);
            }
        }
        $('#header').html("I" + num);
        $('#miniHeader').html("I" + num);
    } else if (num < 46) {
        N1.push(num);
        for (var i = NR.length - 1; i >= 0; i--) {
            if (NR[i] === num) {
                NR.splice(i, 1);
            }
        }
        $('#header').html("N" + num);
        $('#miniHeader').html("N" + num);
    } else if (num < 61) {
        G1.push(num);
        for (var i = GR.length - 1; i >= 0; i--) {
            if (GR[i] === num) {
                GR.splice(i, 1);
            }
        }
        $('#header').html("G" + num);
        $('#miniHeader').html("G" + num);
    } else if (num < 76) {
        O1.push(num);
        for (var i = OR.length - 1; i >= 0; i--) {
            if (OR[i] === num) {
                OR.splice(i, 1);
            }
        }
        $('#header').html("O" + num);
        $('#miniHeader').html("O" + num);
    }
}

function displayGuess() {
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
}
/*Used to show which numbers have been guessed
takes in a position array and a corresponding boolean array*/
function setBackground() {

}

function setLine() {

}

function setFont() {

}

function setShade() {

}

function turnColor(array, array2, color) {
    for (p = 0; p < array.length; p++)
        if (array2[p] === true) {
            $(array[p]).css('background-color', color);
        }
}
/*Used in the reset function to clear background color
takes in a position array*/
function turnWhite(whites) {
    for (o = 0; o < whites.length; o++) {
        $(whites[o]).css('background-color', 'transparent');
    }
}
/*Adds a true value to the boolean array if necessary*/
function toTrue(a, al) {
    for (x = 0; x < al.length; x++) {
        if (num === al[x]) {
            a[x] = true;
        }
    }
}
/*checks to see if there is a winning combination
takes in a  boolean array and a player name*/
function isWin(winArray, winned) {
    /*All B's*/
    if (winArray[0] === true && winArray[0] === winArray[1] && winArray[0] === winArray[2] && winArray[0] === winArray[3] && winArray[0] === winArray[4]) {
        winned = true;
        console.log("All B's" + 1);
    } /*All I's*/
    else if (winArray[5] === true && winArray[5] === winArray[6] && winArray[5] === winArray[7] && winArray[5] === winArray[8] && winArray[5] === winArray[9]) {
        winned = true;
        console.log("All I's" + 2);
    } /*All N's*/
    else if (winArray[10] === true && winArray[10] === winArray[11] && winArray[10] === winArray[12] && winArray[10] === winArray[13] && winArray[10] === winArray[14]) {
        winned = true;
        console.log("All N's" + 3);
    } /*All G's*/
    else if (winArray[15] === true && winArray[15] === winArray[16] && winArray[15] === winArray[17] && winArray[15] === winArray[18] && winArray[15] === winArray[19]) {
        winned = true;
        console.log("All G's" + 4);
    } /*All O's*/
    else if (winArray[20] === true && winArray[20] === winArray[21] && winArray[20] === winArray[22] && winArray[20] === winArray[23] && winArray[20] === winArray[24]) {
        winned = true;
        console.log("All O's" + 5);
    } /*All 1's*/
    else if (winArray[0] === true && winArray[0] === winArray[5] && winArray[0] === winArray[10] && winArray[0] === winArray[15] && winArray[0] === winArray[20]) {
        winned = true;
        console.log("All 1's" + 6);
    } /*All 2's*/
    else if (winArray[1] === true && winArray[1] === winArray[6] && winArray[1] === winArray[11] && winArray[1] === winArray[16] && winArray[1] === winArray[21]) {
        winned = true;
        console.log("All 2's" + 7);
    } /*All 3's*/
    else if (winArray[2] === true && winArray[2] === winArray[7] && winArray[2] === winArray[12] && winArray[2] === winArray[17] && winArray[2] === winArray[22]) {
        winned = true;
        console.log("All 3's" + 8);
    } /*All 4's*/
    else if (winArray[3] === true && winArray[3] === winArray[8] && winArray[3] === winArray[13] && winArray[3] === winArray[18] && winArray[3] === winArray[23]) {
        winned = true;
        console.log("All 4's" + 9);
    } /*All 5's*/
    else if (winArray[4] === true && winArray[4] === winArray[9] && winArray[4] === winArray[14] && winArray[4] === winArray[19] && winArray[4] === winArray[24]) {
        winned = true;
        console.log("All 5's" + 10);
    } /*Top right to bottom left*/
    else if (winArray[0] === true && winArray[0] === winArray[6] && winArray[0] === winArray[12] && winArray[0] === winArray[18] && winArray[0] === winArray[24]) {
        winned = true;
        console.log("Tr to Bl" + 11);
    } /*Bottom left to top right*/
    else if (winArray[4] === true && winArray[4] === winArray[8] && winArray[4] === winArray[12] && winArray[4] === winArray[16] && winArray[4] === winArray[20]) {
        winned = true;
        console.log("Br to Tl" + 12);
    }
    return winned;
}
/*Resets the boards and begins anew*/
function resetGame() {
    playerArray[0].playerBool = [false, false, false, false, false,
        false, false, false, false, false,
        false, false, true, false, false,
        false, false, false, false, false,
        false, false, false, false, false
    ];
    win = false;
    start = true;
    winCount = 0;
    guessCount = 0;
    guessList = [];
    B1 = [];
    I1 = [];
    G1 = [];
    N1 = [];
    O1 = [];
    winner = 0;
    $('#header').html("Ready to start again");
    $('#miniHeader').html("Players");
    $('.middle').css('background-color', playerArray[0].playerShade)
    BR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    IR = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    NR = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    GR = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
    OR = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];
    for (i = 0; i < playerArray.length; i++) {
        turnWhite(playerArray[i].playerBoard);
    }
    for (i = 0; i < playerArray.length; i++) {
        turnWhite(playerArray[i].playerMini);
    }
    for (i = 0; i < playerArray.length; i++) {
        genBoard(playerArray[i].playerBoard, playerArray[i].playerAll);
    }
    for (i = 0; i < playerArray.length; i++) {
        playerArray[i].playerBool = [false, false, false, false, false,
            false, false, false, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
            false, false, false, false, false
        ];
    }
    for (i = 0; i < playerArray.length; i++) {
        playerArray[i].playerAll = [];
    }
    for (i = 0; i < playerArray.length; i++) {
        playerArray[i].playerWin = false;
    }
    for (i = 0; i < playerArray.length; i++) {
        $(playerArray[i].playerMini[12]).css('background-color', 'red');
        $(playerArray[i].playerBoard[12]).css('background-color', 'red');
    }
}

function done() {
    if (win === true) {
        $('button.again').click(function() {
            if (win === true) {
                resetGame();
            }
            win = false;
        });
    }
}

function displayLeaders(player) {
    $('#leader_' + player.playerID).html(player.playerName + " has " + player.playerNumWins + " wins");
    console.log(player.playerID);
}

$(document).ready(function() {

    $('button.new').click(function() {


        getName();
    })
    console.log(playerArray.length)
    $('button.next').click(function() {
        $('button.next').html("Next Draw");
        if (start === true) {
            for (i = 0; i < playerArray.length; i++) {
                genBoard(playerArray[i].playerBoard, playerArray[i].playerAll);
            }
        }
        start = false;
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
            displayGuess();
            for (i = 0; i < playerArray.length; i++) {
                toTrue(playerArray[i].playerBool, playerArray[i].playerAll);
            }
            for (i = 0; i < playerArray.length; i++) {
                turnColor(playerArray[i].playerMini, playerArray[i].playerBool, playerArray[i].playerShade);
            }
            for (i = 0; i < playerArray.length; i++) {
                turnColor(playerArray[i].playerBoard, playerArray[i].playerBool, playerArray[i].playerShade);
            }
            for (i = 0; i < playerArray.length; i++) {
                var temp = isWin(playerArray[i].playerBool, playerArray[i].playerWin);
                playerArray[i].playerWin = temp;

            }
            for (i = 0; i < playerArray.length; i++) {
                if (playerArray[i].playerWin === true) {
                    winCount++;
                    winner = playerArray[i].playerName;
                    playerArray[i].playerNumWins++;
                }
            }
            for (i = 0; i < playerArray.length; i++) {
                console.log(playerArray[i].playerName + " has " + playerArray[i].playerNumWins + " wins");
                displayLeaders(playerArray[i]);
            }
            if (winCount > 1) {
                $('#header').html("We had " + winCount + " winners!!!");
                win = true;
            } else if (winCount === 1) {
                $('#header').html(winner + " is the winner");
                win = true;
            }
        }
        if (win === true) {
            done();
        }
    });
    /*problem for tomorrow, I still enter the reset function even when the variable should not allow me to*/
});