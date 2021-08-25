"use strict";

const inputString = document.getElementById('inputString');
const checkboxSort = document.getElementById('checkboxSort');
const resultDiv = document.getElementById('result');
let divSizeCounter = 0;

function btnOnclick() {
    divSizeCounter = 0;
    resultDiv.innerHTML = '';
    resultDiv.style.height += '40px'
    let string = inputString.value;
    if (checkboxSort.checked) {
        let tempArr = string.split('');
        tempArr.sort();
        string = tempArr.join('');
    }
    generateString("", string);
}

function generateString(prefix, string) {
    let strLen = string.length;
    if (strLen == 0) {
        resultDiv.innerHTML += `${prefix}<br>`;
        divSizeCounter++;
    }
    for (let i = 0 ; i < strLen ; i++) {
        let newPrefix = prefix + string[i];
        let newString = string.substring(0, i) + string.substring(i+1, strLen);
        generateString(newPrefix, newString);
    } 
    resultDiv.style.height = `${24 * divSizeCounter}px`;
}