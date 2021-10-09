"use strict";

const storage = [];

let destinyArr = ['id', 'name', 'age', 'country'];

const input = document.createElement("input");
input.type = "text";
input.onblur = () => {
    let line = input.parentNode.parentNode.getAttribute('row');
    let dest = input.parentNode.getAttribute('destiny');
    storage[line][dest] = input.value;
    input.parentNode.innerHTML = input.value;
    input.remove();
}

const table = document.querySelector('table');
let tableHeaders = table.querySelectorAll('th');
let tableRows = table.querySelectorAll('tr');
let size = destinyArr.length;
let deep = tableRows.length;
for (let i = 0; i < size; i++) {
    tableHeaders[i].setAttribute('destiny',destinyArr[i]);
    for (let row = 1; row < deep; row++) {
        if (i === 0) {
            tableRows[row].setAttribute('row', row - 1);
            storage.push({});
        }
        let ceil = tableRows[row].querySelectorAll('td')[i]
        ceil.setAttribute('destiny',destinyArr[i]);
        storage[row - 1][destinyArr[i]] = ceil.innerHTML;
    }
}
table.addEventListener('click', e => clickOn(e.target));

function clickOn(e) {
    if (e.tagName == 'TH') dataSort(e.getAttribute('destiny'));
    if (e.tagName == 'SPAN') dataSort(e.parentNode.getAttribute('destiny'));
    if (e.tagName == 'TD') dataEntry(e);
}

function dataSort(dest) {
    storage.sort((a, b) => {
        if (a[dest] > b[dest]) {
            return 1;
        }
        if (a[dest] < b[dest]) {
            return -1;
        }
        return 0;
    });
    updateTable();
}

function updateTable() {
    for (let row = 0; row < deep - 1; row++) {
        for (let i = 0; i < size; i++) {
            tableRows[row + 1].querySelectorAll('td')[i].innerHTML = storage[row][destinyArr[i]];
        }
    }
}

function dataEntry(e) {
    input.value = e.innerHTML
    e.innerHTML = '';
    e.append(input);
    input.select();
}
