"use strict";

const arrayType = {
    one: document.getElementById('rOne'),
    two: document.getElementById('rTwo'),
    hideLinesArr: Array.from(document.getElementsByClassName('hide-line hide')),
    switch: function() {
        this.one.parentNode.classList.toggle('selected', this.one.checked);
        this.two.parentNode.classList.toggle('selected', this.two.checked);
        this.hideLinesArr.forEach(e => e.classList.toggle('hide', this.one.checked));
        clearAll();
    }
}

const arrayArr =  Array.from(document.getElementsByClassName('array-wrapper')[0]
    .getElementsByClassName('line'))
    .map(e => Array.from(e.getElementsByClassName('ceil')));

const resultArr = Array.from(document.getElementsByClassName('result-wrapper')[0]
    .getElementsByClassName('line'))
    .map(e => Array.from(e.getElementsByClassName('ceil')));

function clearAll() {
    arrayArr.forEach(e => e.forEach(e => e.innerHTML = ''));
    resultArr.forEach(e => e.forEach(e => e.innerHTML = ''));
}

function generateArray() {
    clearAll();
    if (arrayType.one.checked) updateOneArray(Array(4).fill().map(() => Math.floor(Math.random() * 10)));
    else updateTwoArray(Array(3).fill().map(() => Array(4).fill().map(() => Math.floor(Math.random() * 10))));
}

function updateOneArray(arr) {
    let result = getApprox(arr);
    let arrLength = arr.length;
    for (let i = 0; i< arrLength; i++) {
        arrayArr[1][i].innerHTML = arr[i];
        resultArr[1][i].innerHTML = result[i];
    }

}

function updateTwoArray(arr) {
    let result = getApprox(arr);
    let arrLength = arr.length;
    let arrDeepLength = arr[0].length;
    for (let i = 0; i< arrLength; i++) {
        for (let j = 0; j< arrDeepLength; j++) {
            arrayArr[i][j].innerHTML = arr[i][j];
            resultArr[i][j].innerHTML = result[i][j];
        }
    }
}

function getApprox(mainArr, prevArr, nextArr) {
    let resArr = [];
    let arrSize = mainArr.length;
    for (let i = 0; i < arrSize; i++) {
        if (Array.isArray(mainArr[i])) {
            let prevArr = mainArr[i-1] ? mainArr[i-1] : undefined;
            let nextArr = mainArr[i+1] ? mainArr[i+1] : undefined;
            resArr.push(getApprox(mainArr[i] , prevArr, nextArr));
        } else {
            let sum = 0;
            sum += mainArr[i-1] ? mainArr[i-1] : 0;
            sum += mainArr[i+1] ? mainArr[i+1] : 0;
            sum += prevArr ? prevArr[i] : 0;
            sum += nextArr ? nextArr[i] : 0;
            resArr.push(sum);
        }
    }
    return resArr;
}