"use strict";

const categories = document.getElementById('categories');
const dataList = document.getElementById('dataList');
const result = document.getElementById('result');

let dataStorage;
let categoriesReady = false;

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
        unsetAll();
        let param = getFetchParam(categories.value);
        getData(param);
    }
};

function setData(data) {
    dataStorage = data;
    getCategoryFunction();
}

async function getCategoryFunction() {
    let module = await import('./changeCategories.js');
    module.default(dataStorage);
}
  
async function getDataListFunction() {
    let module = await import('./changeDataList.js');
    module.default(dataStorage[dataList.value]);
}

dataList.onchange = function() {
    if (dataList.value === 'unset') result.innerHTML = 'unset';
    else getDataListFunction();
};

function unsetAll () {
    dataList.innerHTML = '<option selected value="unset">unset</option>';
    dataList.selected = 'unset';
    result.innerHTML = 'unset';
}
