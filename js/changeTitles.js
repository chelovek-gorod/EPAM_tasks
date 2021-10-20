"use strict";

export default function changeTitles(data) {
    let object = data.find(e => e.API === titles.value)
    categories.innerHTML = '<option selected value="onload">unset</option>';
    for (let keys in object) categories.innerHTML += `<option value="${keys}">${keys}</option>`;
    categories.selected = 'unset';
    result.innerHTML = 'unset';
}