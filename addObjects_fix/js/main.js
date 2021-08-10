"use strict";

let objectsArr = [
    {apples: 1},
    {buildings: 2},
    {"cool colors": 3},
    {apples: 4, buildings: 5},
    {apples: 6, "cool colors": 7},
    {buildings: 8, "cool colors": 9},
    {apples: 10, buildings: 11, "cool colors": 12}
];

const objectListDiv = document.getElementById("objectList");
const outputDiv = document.getElementById("output");

function addObjectsList() {
    let i = 0;
    for (let object of objectsArr) {
        objectListDiv.innerHTML += `<label class="object"><input type="checkbox" index=${i++}></input> {${objectToString(object)}}</label><br>`
    }
}

function objectToString(object) {
    let result = '';
    for (let [key, value] of Object.entries(object)) {
        result += (`${key}: ${value}, `);
    }
    return result.substr(0, result.length - 2);
}

function checkRadio() {
    return document.querySelector('input[name="objectCreationType"]:checked').value;
}

function tryToGetNewObject() {
    let checkedArr = objectListDiv.querySelectorAll('[type="checkbox"]:checked');
    if (checkedArr.length < 2) outputDiv.innerHTML = `<span style="color: red;">Check at least two objects from Objects list!<span>`;
    else getNewObject(checkedArr);
}

function getNewObject(checkedArr) {
    let resultObject;
    if (checkRadio() === "add") {
        resultObject = getAddObjectsFromList(checkedArr);
    } else {
        resultObject = getIntersectionObjectsFromList(checkedArr);
    }
    outputDiv.innerHTML = `<span style="color: white;">{${objectToString(resultObject)}}<span>`;
}

function getAddObjectsFromList(checkedArr) {
    let newObject = {};
    for (let object of checkedArr) {
        for (let [key, value] of Object.entries(objectsArr[object.getAttribute("index")])) {
            if (key in newObject) newObject[key] += value;
            else newObject[key] = value;
        }
    }
    return newObject;
}

function getIntersectionObjectsFromList(checkedArr) {
    let newObject = {};
    let keyNymbers = {};
    for (let object of checkedArr) {
        for (let [key, value] of Object.entries(objectsArr[object.getAttribute("index")])) {
            // add all keys and summarize values in newObject
            if (key in newObject) newObject[key] += value;
            else newObject[key] = value;
            // count keys in keyNymbers
            if (key in keyNymbers) keyNymbers[key] ++;
            else keyNymbers[key] = 1;
        }
    }
    for (let key in keyNymbers) {
        if (keyNymbers[key] < checkedArr.length) delete newObject[key];
    }
    return newObject;
}

addObjectsList();