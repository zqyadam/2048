function showNumberWithAnimation(i, j, number) {
    let numberCell = $(`#number-cell-${i}-${j}`);
    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width: '100px',
        height: '100px',
        left: getPosLeft(i, j),
        top: getPosTop(i, j)
    }, 50);
}


function showMoveAnimation(fromX, fromY, toX, toY) {
    let numberCell = $(`#number-cell-${fromX}-${fromY}`);

    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);

}


function updateScore(score) {
    $('#score').text(score);
}