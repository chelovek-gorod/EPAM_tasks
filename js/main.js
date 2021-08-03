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

let resultObjectsArr = [];

const objectListDiv = document.getElementById("objectList");
const outputDiv = document.getElementById("output");

function addObjectsList() {
    for (let object of objectsArr) {
        objectListDiv.innerHTML += `<label class="object"><input type="checkbox"></input> {${objectToString(object)}}</label><br>`
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

function getNewObject() {
    let checkedObjectsArr = getChecked();
    if (checkedObjectsArr.length < 2) outputDiv.innerHTML = `<span style="color: red;">Chack at least two objects from Objects list!<span>`;
    else {
        let resultObject;
        if (checkRadio() === "add") resultObject = addObjectsFromList(checkedObjectsArr);
        else resultObject = intersectionObjectsFromList(checkedObjectsArr);
        resultObjectsArr.push(resultObject);
        console.clear();
        console.log(resultObjectsArr);
        outputDiv.innerHTML = `<span style="color: white;">{${objectToString(resultObject)}}<span>`;
    }
}

function addObjectsFromList(checkedObjectsArr) {
    let newObject = {};
    for (let object of checkedObjectsArr) {
        for (let [key, value] of Object.entries(object)) {
            if (key in newObject) newObject[key] += value;
            else newObject[key] = value;
        }
    }
    return newObject;
}

function intersectionObjectsFromList(checkedObjectsArr) {
    let newObject = {};
    let keyNymbers = {};
    for (let object of checkedObjectsArr) {
        for (let [key, value] of Object.entries(object)) {
            // add all keys and summarize values in newObject
            if (key in newObject) newObject[key] += value;
            else newObject[key] = value;
            // count keys in keyNymbers
            if (key in keyNymbers) keyNymbers[key] ++;
            else keyNymbers[key] = 1;
        }
    }
    for (let key in keyNymbers) {
        if (keyNymbers[key] < checkedObjectsArr.length) delete newObject[key];
    }
    return newObject;
}

function getChecked() {
    let resultArr = [];
    let checkboxesArr = objectListDiv.querySelectorAll('[type="checkbox"]');
    for (let i = 0; i < checkboxesArr.length; i++) {
        if (checkboxesArr[i].checked) resultArr.push(objectsArr[i]);
    }
    return resultArr;
}

addObjectsList();