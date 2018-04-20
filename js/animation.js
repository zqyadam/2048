function showNumberWithAnimation(i, j, number) {
    let numberCell = $(`#number-cell-${i}-${j}`);
    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.css('border-radius', 0.06 * cellSideLength);
    numberCell.css('font-size', 0.6 * cellSideLength + 'px');
    numberCell.text(number);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
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