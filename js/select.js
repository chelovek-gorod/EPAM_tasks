'use strict';

dataStorage.forEach(e => titles.innerHTML += `<option value="${e.API}">${e.API}</option>`);

function changeTitles() {
    let object = dataStorage.find(e => e.API === titles.value)
    categories.innerHTML = '<option selected value="onload">unset</option>';
    for (let keys in object) categories.innerHTML += `<option value="${keys}">${keys}</option>`;
    categories.selected = 'unset';
    result.innerHTML = 'unset';
}

function changeCategories() {
    let object = dataStorage.find(e => e.API === titles.value);
    result.innerHTML = (categories.value == 'Link') ?
        `<a href="${object[categories.value]}" target="_blank">${object[categories.value]}</a>` :
        object[categories.value];
}