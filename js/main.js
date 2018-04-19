let board = new Array();
let score = 0;
let hasConflicted = new Array();

$(document).ready(function () {
    newGame();
});


function newGame() {
    // init board
    initBoard();
}


function initBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    generateOneNumber();
    generateOneNumber();
    updateBoardView();

    score = 0;
}


function updateBoardView() {
    $('.number-cell').remove();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let numberCellStr = `<div class="number-cell" id="number-cell-${i}-${j}"></div>`
            $('#grid-container').append(numberCellStr);
            let theNumberCell = $(`#number-cell-${i}-${j}`);

            if (board[i][j] == 0) {
                theNumberCell.css('height', '0px');
                theNumberCell.css('width', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);

            } else {
                theNumberCell.css('height', '100px');
                theNumberCell.css('width', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}


function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    let emptySpace = findEmptySpace(board);
    console.log(emptySpace.length);
    
    let [randX, randY] = emptySpace[parseInt(Math.random() * emptySpace.length)];
    // console.log(randIndex);
    
    // let randX = parseInt(Math.random() * 4);
    // let randY = parseInt(Math.random() * 4);

    // console.log(randX);
    // console.log(randY);

    // while (board[randX][randY] != 0) {
    //     console.log('try another position');

    //     randX = parseInt(Math.random() * 4);
    //     randY = parseInt(Math.random() * 4);
    // }

    let randNumber = Math.random() < 0.5 ? 2 : 4;

    board[randX][randY] = randNumber;

    showNumberWithAnimation(randX, randY, randNumber);

    return true;
}




$(document).keydown(function (event) {
    event.preventDefault();
    switch (event.keyCode) {
        case 37: // left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 310); 
            }
            break;
        case 38: // up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 310); 
            }
            break;
        case 39: // right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 310); 
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 310); 
            }
            break;
        default:
            break;
    }
});


function isGameOver() {
    if (nospace(board) && nomove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert('gameover');
}


function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    // move left
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200);
    return true;

}


function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    // move right
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200);
    return true;

}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    // move up
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200);
    return true;

}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    // move up
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200);
    return true;

}