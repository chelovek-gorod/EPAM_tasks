"use strict";

const categories = document.getElementById('categories');
const dataList = document.getElementById('dataList');
const result = document.getElementById('result');

let categoriesReady = false;
let dataStorage;

const url = 'https://api.publicapis.org/';
const paramCategories = 'categories';
function getFetchParam(category) {
    return `entries?category=${category}&https=true`;
}

getData();

function getData(param = paramCategories) {
    fetch(url + param)
    .then(response => response.json())
    .then(data => {
        if (param === paramCategories) {
            data.forEach(e => categories.innerHTML += `<option value="${e}">${e}</option>`);
            categoriesReady = true;
        } else {
            setData(data.entries);
        }
    })
    .catch(err => result.innerHTML = `<span class="error">Fetch problem: ${err.message}</span>`);
}

categories.onchange = function () {
    if (categoriesReady) {
        let param = getFetchParam(categories.value);
        getData(param);
    }
}

function setData(data) {
    dataStorage = data;
    for (let key in data) dataList.innerHTML += `<option value="${key}">${data[key].API}</option>`;
    dataList.selected = 'unset';
    result.innerHTML = 'unset';
}

dataList.onchange = function () {
    let object = dataStorage[dataList.value];
    result.innerHTML = '';
    result.innerHTML += object.Auth ? `<span>Auth :</span> ${object.Auth} <br>` : '';
    result.innerHTML += object.Description ? `<span>Description :</span> ${object.Description} <br>` : '';
    result.innerHTML += object.Cors ? `<span>Cors :</span> ${object.Cors} <br>` : '';
    result.innerHTML += object.HTTPS ? `<span>HTTPS :</span> ${object.HTTPS} <br>` : '';
    result.innerHTML += object.Link ? `<a href="${object.Link}" target="_blank">${object.Link}</a>` : '';
}
