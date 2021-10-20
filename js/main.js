"use strict";

const titles = document.getElementById('titles');
const categories = document.getElementById('categories');
const result = document.getElementById('result');

let dataStorage;

const url = 'https://api.publicapis.org/'
const paramCategory = 'entries?category=animals&https=true'

const updateSelectsScript = document.createElement('script');
updateSelectsScript.src = './js/select.js';

fetch(url + paramCategory)
    .then(response => response.json())
    .then(json => setData(json.entries))
    .catch(err => console.log('Fetch problem: ' + err.message));

function setData(data) {
    dataStorage = data;
    document.body.append(updateSelectsScript);
}