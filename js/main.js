"use strict";

const container = document.getElementById('container');
const stack = document.getElementById('stack');
const stackTop = 420;
const stackArr = [];
const awaitDiv = document.getElementById('await');

let waitClick = false;
let counting = false;

const keyBoard = document.getElementsByClassName('keyBoard')[0];
keyBoard.addEventListener('click', e => {
    if (waitClick && e.target.classList.contains('key') && !e.target.classList.contains('blocked')) {
        dropKey(e.target);
    }
});

const keyInit = {
    content : '0123456789+-*/C',
    step : 100,
    keysInLine : 5
}

const tempKey = {
    div : undefined,
    maxTop : 330,
    startLeft : 225,
}

let keyContentSize = keyInit.content.length;
const keys = new Array(keyContentSize);
for (let k = 0; k < keyContentSize; k++) {
    keys[k] = document.createElement('div');
    keys[k].classList.add('key');
    keyBoard.append(keys[k]);
    keys[k].innerHTML = keyInit.content[k];
    keys[k].style.left = (k % keyInit.keysInLine) * keyInit.step + 'px';
    keys[k].style.top = Math.floor(k / keyInit.keysInLine) * keyInit.step + 'px';
    if (k > 9) keys[k].classList.add('blocked');
}

waitClick = true;

function backStackTop(top, add) {
    stack.style.top = add ? ++top + 'px' : --top + 'px';
    if (top !== stackTop) setTimeout(backStackTop, 100, top, add);
}

function dropKey(key) {
    waitClick = false;
    keyBoard.classList.toggle('blocked');

    let leftPoint = tempKey.startLeft + parseInt(key.style.left)
    tempKey.div = document.createElement('div');
    tempKey.div.innerHTML = key.innerHTML;
    tempKey.div.style.top = key.style.top;
    tempKey.div.style.left = leftPoint + 'px';
    tempKey.div.classList.add('key', 'tempKey');
    container.append(tempKey.div);
    setTimeout(() => {
        tempKey.div.addEventListener("transitionend", () => {
            animationMech.timeout = animationMech.timeoutSlow;
            animationConveyor.animate = true;
            doAnimate(animationConveyor);
            moveKeyToStack(leftPoint);
        }, false);
        tempKey.div.style.top = tempKey.maxTop + 'px', 100
    });

    animationMech.animate = true;
    animationMech.timeout = animationMech.timeoutFast;
    doAnimate(animationMech)
}

function moveKeyToStack(leftPoint) {
    if (leftPoint > 0) {
        tempKey.div.style.left = leftPoint - 25 + 'px';
        setTimeout(moveKeyToStack, 60, leftPoint - 25);
    } else {
        animationMech.animate = false;
        animationConveyor.animate = false;
        addKeyToStack();
    }
}

function addKeyToStack() {
    if (tempKey.div.innerHTML === 'C' && stackArr.length) {
        let last = stackArr.pop();
        stackPop(last);
    } else {
        let pos = stackArr.length;
        stackArr[pos] = document.createElement('div');
        stackArr[pos].classList.add('key');
        stack.prepend(stackArr[pos]);
        stack.style.top = stackTop - 90 + 'px';
        stackArr[pos].innerHTML = tempKey.div.innerHTML;
        backStackTop(stackTop - 90, true);
    }
    tempKey.div.remove();
}

function backStackTop(top, key) {
    if (top !== stackTop) {
        let topSize =  key ? top + 10 : top - 10;
        stack.style.top = topSize + 'px';
        setTimeout(backStackTop, 30, topSize, key);
    }
    else {
        if (!counting) testStack();
    }
}

function testStack() {
    let lastValue = stackArr.length ? stackArr[stackArr.length - 1].innerHTML : false;
    let penultValue = stackArr.length > 1 ? stackArr[stackArr.length - 2].innerHTML : false;
    if (lastValue == '+' || lastValue == '-' ||lastValue == '*' || lastValue == '/') {
        // Counting
        doPromise(+stackArr[stackArr.length - 3].innerHTML, lastValue, +penultValue);
        counting = true;
        let last = stackArr.pop();
        stackPop(last);

    } else {
        readyToWork();
        keys[10].classList.toggle('blocked', !penultValue);
        keys[11].classList.toggle('blocked', !penultValue);
        keys[12].classList.toggle('blocked', !penultValue);
        keys[13].classList.toggle('blocked', !penultValue);
        keys[14].classList.toggle('blocked', !lastValue);
    }
}

function doPromise(v1, sign, v2) {
    let delay = (1 + Math.floor(Math.random() * 3)) * 1000;
    awaitDiv.style.opacity = 1;
    let result;
    switch(sign) {
        case '+' : result = v1 + v2; break;
        case '-' : result = v1 - v2; break;
        case '*' : result = v1 * v2; break;
        case '/' : result = v1 / v2; break;
    }
    if (isNaN(result))result = 0;
    new Promise((res, rej) => {
        setTimeout(() => res(result), delay);
    })
    .then((num) => {
        let numSize = num.toString().length;
        if (numSize > 12) {
            if (num > 999999999999) num = Infinity;
            else if (num < -99999999999) num = -Infinity;
            else {
                num = num.toString().slice(0, 12);
            }
            numSize = 12;
        }
        let font = (numSize === 1) ? 48 : (numSize < 10) ? (48 - numSize * 4) : 11;
        stackArr[stackArr.length - 2].innerHTML = num; console.log(font);
        stackArr[stackArr.length - 2].style.fontSize = font + 'px';
        awaitDiv.style.opacity = 0;
        let last = stackArr.pop();
        counting = false;
        stackPop(last);
    });
}

function stackPop(last) {
    last.remove();

    let splash = document.createElement('img');
    splash.id = 'splash';
    splash.src = './Images/splash.gif';
    container.append(splash);
    setTimeout(() => splash.remove(), 850);

    backStackTop(parseInt(stack.style.top) + 90, false);
}

function readyToWork() {
    keyBoard.classList.toggle('blocked');
    waitClick = true;
}

/* ANIMATION */

const spritesMech = [
    './Images/m3.svg',
    './Images/m2.svg',
    './Images/m1.svg',
    './Images/m0.svg'
];

const spritesConveyor = [
    './Images/c0.svg',
    './Images/c1.svg',
    './Images/c2.svg',
    './Images/c3.svg',
    './Images/c4.svg',
    './Images/c5.svg',
    './Images/c6.svg',
    './Images/c7.svg'
];

const animationConveyor = {
    animate : false,
    img : document.getElementById('conveyor'),
    frame : 0,
    sprite : spritesConveyor,
    timeout : 60,
}

const animationMech = {
    animate : false,
    img : document.getElementById('mech'),
    frame : 0,
    sprite : spritesMech,
    timeout : 0,
    timeoutSlow : 60,
    timeoutFast : 20,
}

function doAnimate(a) {
    a.img.src = a.sprite[a.frame];
    a.frame = (a.frame === a.sprite.length - 1) ? 0 : a.frame + 1;
    if (a.animate) setTimeout(doAnimate, a.timeout, a);
}