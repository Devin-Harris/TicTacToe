//GameScore Initializer
let GameScore = 0;
let UserScore = 0;
let CompScore = 0;
let GameOverIndicator = 0;

//Initialize the Presented scores
let UserGameScore = 0;
let CompGameScore = 0;

$(document).ready(function() {

    //Matching Button To Text
    let TitleWidth = $('.title h1').width();
    $('#Rules').css('width', TitleWidth);

    //Hide Rules and Show on click event
    $('#Rules').click(() => {
        $('#RulesText').slideDown(300);
        $('#Rules').slideUp(100);
    });

    $('#CloseRules').click(() => {
        $('#RulesText').slideUp(300);
        $('#Rules').slideDown(100);
    });

    //Create Board with 9 Boxs
    CreateBoard(UserGameScore, CompGameScore);

    //Game Board is Clicked
    $('.boardSection').click(function () {

        if (($(this).html() == "") && (GameOverIndicator == 0)){
            $(this).html('<h1>X</h1>');

            //Stop Game if all spaces are filled
            CheckGameScore();
        }
    });

    //Reset is Clicked
    $('#Reset').click(ResetGame);
});

function CreateBoard(UserGameScore, CompGameScore) {
    //Create a 3x3 grid
    for (let i = 0; i < 9; i++) {
        let Board = document.querySelector('#board');

        let NewElm = document.createElement("div");
        NewElm.classList.add('boardSection');
        $(NewElm).attr('id', i);

        Board.append(NewElm);
    }

    //Place Scores on sides
    $('#userScore').text(UserGameScore).css('color', 'rgb(73, 152, 243)');
    $('#compScore').text(CompGameScore).css('color', 'rgb(255, 211, 16)');
}

function CompMove() {
    if (GameOverIndicator == 0) {
        let RandNum = Math.floor(Math.random() * 9);
        let Elm = '#' + RandNum;

        //Make sure comp isnt placing in a filled square
        while ($(Elm).html() != "") {
            RandNum = Math.floor(Math.random() * 9);
            Elm = '#' + RandNum;
        }

        //Mark the valid square the computer chose
        $(Elm).html('<h1>O</h1>')
    }
}

function CheckGameScore() {
    GameScore = 0;
    UserScore = 0;
    CompScore = 0;

    if (GameOverIndicator == 0) {
        for (let i = 0; i < 9; i++) {
            if ($('#' + i).html() != "") {
                GameScore += 1;
            }
        }

        if (GameScore < 9) {
            //Allow the computer to select a location
            if (GameScore < 9) {
                CompMove();
            }
        } else {
            $('#GameResult').hide();
            $('#GameResult').text('Its a tie!');
            $('#GameResult').slideDown();
        }

        //Check to see if the computer or the player Won!
        RowCheck();
        ColumnCheck();
        DiagonalCheck();

    }
}

function RowCheck() {
    //Check Which Row we are on
    for (let i = 0; i < 3; i++) {
        //Reset scores for each row
        UserScore = 0;
        CompScore = 0;
        //Depending on Row which cells to check
        //First Row (0,1,2)
        //Second Row (3,4,5)
        //Third Row (6,7,8)
        for (let j = 0; j < 3; j++) {
            let CellID = j + (3 * i);
            if ($('#' + CellID).children().text() == 'O') {
                CompScore += 1;
            } else if ($('#' + CellID).children().text() == 'X') {
                UserScore += 1;
            }
        }
        if (UserScore >= 3) {
            UserWin();
            break;
        } else if (CompScore >= 3) {
            CompWin();
            break;
        }
    }
}

function ColumnCheck() {
    //Check Which Column we are on
    for (let i = 0; i < 3; i++) {
        //Reset scores for each Column
        UserScore = 0;
        CompScore = 0;
        //Depending on Column which cells to check
        //First Column (0,3,6)
        //Second Column (1,4,7)
        //Third Column (2,5,8)
        for (let j = 0; j < 3; j++) {
            let CellID = i + (3 * j);
            if ($('#' + CellID).children().text() == 'O') {
                CompScore += 1;
            } else if ($('#' + CellID).children().text() == 'X') {
                UserScore += 1;
            }
        }
        if (UserScore >= 3) {
            UserWin();
            break;
        } else if (CompScore >= 3) {
            CompWin();
            break;
        }
    }
}
function DiagonalCheck() {
    //Bottom left to top right diagonal
    let CellArr1 = [6, 4, 2];

    //Check top left to bottom right diagonal
    let CellArr2 = [0, 4, 8];

    //Reset Scores
    UserScore = 0;
    CompScore = 0;
    //Check bottom left to top right diagonal
    CellArr1.forEach(index => {
        
        if ($('#' + index).children().text() == 'O') {
            CompScore += 1;
            console.log(index);
        } else if ($('#' + index).children().text() == 'X') {
            UserScore += 1;
            console.log(index);
        }
    });

    //Check Score Counts
    if (UserScore >= 3) {
        UserWin();
    } else if (CompScore >= 3) {
        CompWin();
    }
    

    //Reset Scores
    UserScore = 0;
    CompScore = 0;
    //Check top left to bottom right diagonal
    CellArr2.forEach(index => {
        
        if ($('#' + index).children().text() == 'O') {
            CompScore += 1;
            console.log(index);
        } else if ($('#' + index).children().text() == 'X') {
            UserScore += 1;
            console.log(index);
        }
    });

    //Check Score Counts
    if (UserScore >= 3) {
        UserWin();
    } else if (CompScore >= 3) {
        CompWin();
    }
    
}

function UserWin() {
    $('#GameResult').hide();
    $('#GameResult').text('Congrats you beat the bot.');
    $('#GameResult').slideDown();
    GameOverIndicator = 1;

    //Updating PresentedScores
    UserGameScore += 1;
    UpdateScores();
}
function CompWin() {
    $('#GameResult').hide();
    $('#GameResult').text('HAHAHA YOU LOST!');
    $('#GameResult').slideDown();
    GameOverIndicator = 1;
    
    //Updating PresentedScores
    CompGameScore += 1;
    UpdateScores();
}

function UpdateScores() {
    $('#userScore').text(UserGameScore);
    $('#compScore').text(CompGameScore);
}

function ResetGame() {
    //GameScore Initializer
    GameScore = 0;
    UserScore = 0;
    CompScore = 0;
    GameOverIndicator = 0;

    //Create a 3x3 grid
    for (let i = 0; i < 9; i++) {
        $('#' + i).html("");
        $('#GameResult').slideUp();
    }
}