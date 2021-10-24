"use strict";

var categories = document.getElementById('categories');
var dataList = document.getElementById('dataList');
var result = document.getElementById('result');

var categoriesReady = false;
var dataStorage = void 0;

var url = 'https://api.publicapis.org/';
var paramCategories = 'categories';
function getFetchParam(category) {
    return 'entries?category=' + category + '&https=true';
}

getData();

function getData() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : paramCategories;

    fetch(url + param).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (param === paramCategories) {
            data.forEach(function (e) {
                return categories.innerHTML += '<option value="' + e + '">' + e + '</option>';
            });
            categoriesReady = true;
        } else {
            setData(data.entries);
        }
    }).catch(function (err) {
        return result.innerHTML = '<span class="error">Fetch problem: ' + err.message + '</span>';
    });
}

categories.onchange = function () {
    if (categoriesReady && categories.value !== 'unset') {
        var param = getFetchParam(categories.value);
        getData(param);
    } else unsetAll();
};

function setData(data) {
    dataStorage = data.slice();
    unsetAll();
    for (var key in data) {
        dataList.innerHTML += '<option value="' + key + '">' + data[key].API + '</option>';
    }
}

dataList.onchange = function () {
    if (dataList.value === 'unset') result.innerHTML = 'unset';else {
        var object = dataStorage[dataList.value];
        result.innerHTML = '';
        result.innerHTML += object.Auth ? '<span>Auth :</span> ' + object.Auth + ' <br>' : '';
        result.innerHTML += object.Description ? '<span>Description :</span> ' + object.Description + ' <br>' : '';
        result.innerHTML += object.Cors ? '<span>Cors :</span> ' + object.Cors + ' <br>' : '';
        result.innerHTML += object.HTTPS ? '<span>HTTPS :</span> ' + object.HTTPS + ' <br>' : '';
        result.innerHTML += object.Link ? '<a href="' + object.Link + '" target="_blank">' + object.Link + '</a>' : '';
    }
};

function unsetAll() {
    dataList.innerHTML = '<option selected value="unset">unset</option>';
    dataList.selected = 'unset';
    result.innerHTML = 'unset';
}