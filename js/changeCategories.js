"use strict";

export default function changeCategories(data) {
    for (let key in data) dataList.innerHTML += `<option value="${key}">${data[key].API}</option>`;
}