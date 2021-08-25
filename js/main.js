"use strict";

const inputNum1 = document.getElementById("inputNum1");
const inputNum2 = document.getElementById("inputNum2");
const resultDiv = document.getElementById("result");

let rangeNunber1 = BigInt(inputNum1.value);
let rangeNunber2 = BigInt(inputNum2.value);

let validNumbers = true;

function testInput(title, value) {
    let num = +value;
    if (isFinite(num) && !isNaN(num) && Number.isInteger(num)) {
        if (title === 'range nunber 1') {
            rangeNunber1 = BigInt(num);
            if (rangeNunber2 == +inputNum2.value) {
                validNumbers = true;
                resultDiv.innerHTML = "";
            }
            else {
                validNumbers = false;
                resultDiv.innerHTML = `<span class="error">range nunber 2 - is not integer!</span>`;
            }
        }
        else {
            rangeNunber2 = BigInt(num);
            if (rangeNunber1 == +inputNum1.value) {
                validNumbers = true;
                resultDiv.innerHTML = "";
            }
            else {
                validNumbers = false;
                resultDiv.innerHTML = `<span class="error">range nunber 1 - is not integer!</span>`;
            }
        }
    } else {
        validNumbers = false;
        resultDiv.innerHTML = `<span class="error">range nunber 1 - is not integer!</span>`;
    }
}

function getRangeNumbers() {
    console.clear();
    if (validNumbers) {
        if (rangeNunber1 < rangeNunber2) resultDiv.innerHTML =  range(rangeNunber1, rangeNunber2);
        else resultDiv.innerHTML = range(rangeNunber2, rangeNunber1);
    }
}

const memoize = (fn) => {
    let cache = {};
    return (n) => {
        if (n in cache) {
            console.log('getFromCache :', n);
            return cache[n];
        } else {
            console.log(' Calculating :', n);
            let result = fn(n);
            cache[n] = result;
            return result;
        }
    }
}

const getSum = memoize((num) => {
    return num * (num + 1n) / 2n;
});

function range(min, max) {
    if (min < 0) {
        let minRange = min * -1n;
        if (max < 0) {
            let maxRange = max * -1n;
            return (getSum(minRange) - getSum(maxRange -1n)) * -1n;
        }
        return getSum(max) + getSum(minRange) * -1n;
    }
    return getSum(max) - getSum(min - 1n);
}
