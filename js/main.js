"use strict";

const titles = document.getElementById('titles');
const categories = document.getElementById('categories');
const result = document.getElementById('result');
const body = document.body;

let dataStorage;
let titlesReady = false;
let categoriesReady = false;

let changeTitles;
let changeCategories;

const url = 'https://api.publicapis.org/';
const paramCategory = 'entries?category=animals&https=true';

fetch(url + paramCategory)
    .then(response => response.json())
    .then(json => setData(json.entries))
    .catch(err => console.log('Fetch problem: ' + err.message));

function setData(data) {
    data.forEach(e => titles.innerHTML += `<option value="${e.API}">${e.API}</option>`);
    dataStorage = data;
    gitTitleFunction(data);
    gitCategoryFunction(data);
}

async function gitTitleFunction() {
    let module = await import('./changeTitles.js');
    changeTitles = module.default;
    titlesReady = true;
  }
  
async function gitCategoryFunction() {
    let module = await import('./changeCategories.js');
    changeCategories = module.default;
    categoriesReady = true;
  }

titles.onchange = function() {
    if (titlesReady) changeTitles(dataStorage);
};

categories.onchange = function() {
    if (categoriesReady) changeCategories(dataStorage);
};