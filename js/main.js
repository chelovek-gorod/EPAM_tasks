"use strict";

class entry {
    constructor(id, name, age, country) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.country = country;
    }
}

const storage = [];

let destinyArr = ['id', 'name', 'age', 'country'];

const input = document.createElement("input");
input.type = "text";
input.onblur = () => {
    let line = input.parentNode.parentNode.getAttribute('r');
    let dest = input.parentNode.getAttribute('destiny');
    storage[line][dest] = input.value;
    input.parentNode.innerHTML = input.value;
    input.remove();
}

const table = document.querySelector('table');
let t_h = table.querySelectorAll('th');
let t_r = table.querySelectorAll('tr');
let size = destinyArr.length;
let deep = t_r.length;
for (let i = 0; i < size; i++) {
    t_h[i].setAttribute('destiny',destinyArr[i]);
    for (let r = 1; r < deep; r++) {
        if (i === 0) {
            t_r[r].setAttribute('r', r - 1);
            storage.push({});
        }
        let ceil = t_r[r].querySelectorAll('td')[i]
        ceil.setAttribute('destiny',destinyArr[i]);
        storage[r - 1][destinyArr[i]] = ceil.innerHTML;
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
    for (let r = 0; r < deep - 1; r++) {
        for (let i = 0; i < size; i++) {
            t_r[r + 1].querySelectorAll('td')[i].innerHTML = storage[r][destinyArr[i]];
        }
    }
}

function dataEntry(e) {
    input.value = e.innerHTML
    e.innerHTML = '';
    e.append(input);
    input.select();
}