var gameSize = 3;
var player_turn = 'x';
var spots_filled = 0;
var to_win = null;
var gameState = [];
var totalSpots = null;
var dj1 = null;
var dj2 = null;
var increment = true;
var layers = 0;

$(document).ready(function () {
    initializeAudioVisualizer(document.getElementById('audio'));
    function_loader();
});

function function_loader() {
    start_game();
    size_select();
    reset_game();
}

function audioClick() {
    $('#fx1').get(0).play();
}
function loadAudioFx() {
    $('#fx2').get(0).play();
}


function reset_game() {
    $('.reset').click(function () {
        loadAudioFx();
        location.reload();
    });

    $('.play_again').click(function () {
        loadAudioFx();
        location.reload();
    });
}

function square_function() {
    $('.gamesquare').on('click', function () {
        audioClick();
        $(this).addClass('clicked');
        place_piece.call(this);
        music_layering.call(this);
    });
}

function place_piece() {
    var row = $(this).data('row');
    var column = $(this).data('column');
    spots_filled++;

    if (player_turn == 'x') {
        $(".player1").removeClass('current_turn');
        gameState[row][column] = 'x';
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        player_turn = 'o';
        $(".player2").addClass('current_turn');
        if (!checkWin(row, column, to_win, 'x')) {
        }
    }
    else if (player_turn == 'o') {

        $(".player2").removeClass('current_turn');
        gameState[row][column] = 'o';
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        player_turn = 'x';
        $(".player1").addClass('current_turn');
        if (!checkWin(row, column, to_win, 'o')) {
        }
    }
}

function start_game() {
    $('#start').click(function () {
        var title = $('#title_page');
        loadSquares();
        player_sn_assign();
        needed_win();
        loadAudioFx();
        title.css("transform", "translateY(-5000px)");
        setTimeout(function () {
            title.hide();
        }, 1000);
    });
}
function needed_win() {
    if (gameSize == 3) {
        to_win = 3;
    }
    else {
        to_win = 5;
    }
    $('.win_condition').html(to_win + ' in a row to win')
    totalSpots = gameSize * gameSize;
}

function size_select() {
    var board_size_select = $(".board_size_select");
    var rookie = $(".rookie");
    var pro = $(".pro");
    var superstar = $(".superstar");

    rookie.click(function () {
        audioClick();
        gameSize = 3;
        board_size_select.removeClass("selected");
        rookie.addClass("selected");
    });

    pro.click(function () {
        audioClick();
        gameSize = 9;
        board_size_select.removeClass("selected");
        pro.addClass("selected");
    });

    superstar.click(function () {
        audioClick();
        gameSize = 20;
        board_size_select.removeClass("selected");
        superstar.addClass("selected");
    });

}
function loadSquares() {
    var $gameboard = $('.board_container');
    for (var i = 0; i < gameSize; i++) {
        var row = $('<div>').addClass('row' + i).addClass('row' + gameSize);
        $gameboard.append(row);
        gameState[i] = [];
        for (var j = 0; j < gameSize; j++) {
            var square = $('<div>').addClass('gamesquare').addClass('gamesquare' + gameSize).data('column', j).data('row', i);
            $('.row' + i).append(square);
            gameState[i][j] = ' ';
        }
    }
    square_function();
}

function player_sn_assign() {
    var player1 = $("#player1_sn");
    var player2 = $("#player2_sn");

    if (player1.val()) {
        $('.player1').html('DJ<br>' + player1.val());
        dj1 = player1.val();
    }
    else {
        $('.player1').html('DJ<br>X treme');
        dj1 = "DJ X treme";
    }
    if (player2.val()) {
        $('.player2').html('DJ<br>' + player2.val());
        dj2 = player2.val();
    }
    else {
        $('.player2').html('DJ<br>O mega');
        dj2 = "DJ O mega";
    }
}

function music_layering() {
    var audio = document.getElementById("audio");
    if (increment) {
        layers++;
        if (layers === 7) {
            increment = false;
        }
    }
    else {
        layers--;
        if (layers === 1) {
            increment = true;
        }
    }
    var currentTime = audio.currentTime;
    $('#audio').attr('src', 'music%20layers/layer' + layers + '.mp3');
    audio.currentTime = currentTime;
}


function checkWin(i, j, numberOfSpots, XorO) {
    var board_container = $('.board_container');
    var win_message = $('.win_message');
    var message = $('.message');

    if (checkVertical(i, j, numberOfSpots, XorO) || checkUpperDiagonal(i, j, numberOfSpots, XorO) || checkHorizontal(i, j, numberOfSpots, XorO) || checkLowerDiagonal(i, j, numberOfSpots, XorO)) {
        board_container.addClass('gameover');
        win_message.removeClass('gameover');
        $('#audio').prop('muted', true);
        loadAudioFx();

        if (XorO == 'x') {
            message.append(dj1 + " is a SUPERSTAR!")
        }
        else {
            message.append(dj2 + " is a SUPERSTAR!")
        }
        return true;
    }
    if (spots_filled === totalSpots) {
        $('#audio').prop('muted', true);
        loadAudioFx();
        board_container.addClass('gameover');
        win_message.removeClass('gameover');
        message.append("Tied game!")
    }
    return false;
}


function checkVertical(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkUpperDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkHorizontal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i][j - step]) {
        if (gameState[i][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i][j + step]) {
        if (gameState[i][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkLowerDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j - step] === XorO) {
            count++;
            step++;
        } else {
            step = 1;
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

