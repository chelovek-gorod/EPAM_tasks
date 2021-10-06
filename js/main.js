"use strict";

const titles = document.getElementById('titles');
const categorys = document.getElementById('categorys');
const result = document.getElementById('result');

let dataStorage;

const url = 'https://api.publicapis.org/'
const paramCategory = 'entries?category=animals&https=true'

fetch(url + paramCategory)
    .then(response => response.json())
    .then(json => getData(json.entries))
    .catch(err => console.log('Fetch problem: ' + err.message));

function getData(data) {
    dataStorage = data;
    data.forEach(e => titles.innerHTML += `<option value="${e.API}">${e.API}</option>`);
}

function changeTitles() {
    let object = dataStorage.find(e => e.API === titles.value)
    categorys.innerHTML = '<option selected value="onload">unset</option>';
    for (let keys in object) categorys.innerHTML += `<option value="${keys}">${keys}</option>`;
    categorys.selected = 'unset';
    result.innerHTML = 'unset';
}

function changeCategorys() {
    let object = dataStorage.find(e => e.API === titles.value);
    result.innerHTML = (categorys.value == 'Link') ?
        `<a href="${object[categorys.value]}" target="_blank">${object[categorys.value]}</a>` :
        object[categorys.value];
}