"use strict";

export default function changeCategories(data) {
    let object = data.find(e => e.API === titles.value);
    result.innerHTML = (categories.value == 'Link') ?
        `<a href="${object[categories.value]}" target="_blank">${object[categories.value]}</a>` :
        object[categories.value];
}