"use strict";

let sign = ['x', 'o'];
let turn = 1;
let freeCeils = 9;

let game = false;

const output = document.getElementById('output');

const board = document.getElementById('board');

const ceils = [];
let line = 0;
let ceil = 0;
Array.from(board.getElementsByClassName('line')).forEach(e => updateLine(e));
function updateLine(e) {
    let lineCeils = Array.from(e.getElementsByClassName('ceil'));
    lineCeils.forEach(ec => ec.setAttribute('c', `${line}${ceil++}`));
    ceils.push(lineCeils);
    ceil = 0;
    line++;
}

board.addEventListener('click', e => clickOn(e.target));

function clickOn(e) {
    if (e.className == 'ceil' && e.innerHTML == '' && game) {
        game = false;
        freeCeils--;
        e.innerHTML = sign[turn];
        testWinHorizontally(e.getAttribute('c'));
    }
}

function testWinHorizontally(c) {
    let line = +c[0];
    if (ceils[line][0].innerHTML == ceils[line][1].innerHTML && ceils[line][1].innerHTML == ceils[line][2].innerHTML) {
        getWinner([ceils[line][0], ceils[line][1], ceils[line][2]]);
    } else testWinVertically(c);
}

function testWinVertically(c) {
    let col = +c[1];
    if (ceils[0][col].innerHTML == ceils[1][col].innerHTML && ceils[1][col].innerHTML == ceils[2][col].innerHTML) {
        getWinner([ceils[0][col], ceils[1][col], ceils[2][col]]);
    } else {
        if (c == '01' || c == '10' || c == '12' || c == '21' || ceils[1][1].innerHTML == '') nextTurn();
        else testWinDiagonally(c);
    }
}

function testWinDiagonally(c) {
    if (ceils[0][0].innerHTML == ceils[1][1].innerHTML && ceils[1][1].innerHTML == ceils[2][2].innerHTML) {
        getWinner([ceils[0][0], ceils[1][1], ceils[2][2]]);
    }
    else if (ceils[2][0].innerHTML == ceils[1][1].innerHTML && ceils[1][1].innerHTML == ceils[0][2].innerHTML) {
            getWinner([ceils[2][0], ceils[1][1], ceils[0][2]]);
    } else nextTurn();
}

function getWinner(c_arr) {
    c_arr.forEach(e => e.classList.toggle('winner'));
    setTimeout (startNewGame, 3000, c_arr);
    output.innerHTML = `Player <b>${sign[turn]}</b> win!`;
}

function nextTurn() {
    if (freeCeils <= 0) draw();
    else {
        turn = turn ? 0 : 1;
        output.innerHTML = `Now turn is <b>${sign[turn]}</b>`;
        game = true;
    }
}

function draw() {
    setTimeout (startNewGame, 3000);
    output.innerHTML = `Draw...`;
}

function startNewGame(c_arr) {
    if (c_arr) c_arr.forEach(e => e.classList.toggle('winner'));
    ceils.forEach(e => e.forEach(e => e.innerHTML = ''));
    sign = ['x', 'o'];
    turn = 0;
    freeCeils = 9;
    game = true;
    output.innerHTML = `Now turn is <b>${sign[turn]}</b>`;
}

nextTurn();