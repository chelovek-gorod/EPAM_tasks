'use strict';

export default function setTitles(data) {
    data.forEach(e => titles.innerHTML += `<option value="${e.API}">${e.API}</option>`);
}



