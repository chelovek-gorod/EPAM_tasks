"use strict";

export default function changeDataList(object) {
    result.innerHTML = '';
    result.innerHTML += object.Auth ? `<span>Auth :</span> ${object.Auth} <br>` : '';
    result.innerHTML += object.Description ? `<span>Description :</span> ${object.Description} <br>` : '';
    result.innerHTML += object.Cors ? `<span>Cors :</span> ${object.Cors} <br>` : '';
    result.innerHTML += object.HTTPS ? `<span>HTTPS :</span> ${object.HTTPS} <br>` : '';
    result.innerHTML += object.Link ? `<a href="${object.Link}" target="_blank">${object.Link}</a>` : '';
}