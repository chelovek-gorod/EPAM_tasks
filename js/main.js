"use strict";

import setTitles from './setTitles.js';
import changeTitles from './changeTitles.js';
import changeCategories from './changeCategories.js';

const titles = document.getElementById('titles');
const categories = document.getElementById('categories');
const result = document.getElementById('result');

let dataStorage;

const url = 'https://api.publicapis.org/';
const paramCategory = 'entries?category=animals&https=true';

fetch(url + paramCategory)
    .then(response => response.json())
    .then(json => setData(json.entries))
    .catch(err => console.log('Fetch problem: ' + err.message));

function setData(data) {
    setTitles(data); console.log(data);
    dataStorage = data; console.log(dataStorage);
    console.log('setData');
}

titles.onchange = function() {
    changeTitles(dataStorage);
};

categories.onchange = function() {
    changeCategories(dataStorage);
};