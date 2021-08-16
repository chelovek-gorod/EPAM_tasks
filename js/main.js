"use strict";

const inputNumbers = document.getElementById("inputNumbers");
let objRandNumbersSize = +inputNumbers.value; 

const container = document.getElementById("container");
const table = document.createElement('table');
const canvas = document.createElement('canvas');
const canvasWidth = 600;
const canvasHeight = 600;
let offset_x = 50;
let offset_y = 50;
let minValueX = -10;
let maxValueX = 10;
let minValueY = 0;
let maxValueY = 1;
let x_steps = 20;
let y_steps = 20;
let xValuesArr = [];
for (let i = minValueX; i <= maxValueX; i++)
    xValuesArr.push(i);
let yValuesArr = [];
for (let i = 0; i <= y_steps; i++)
    yValuesArr.push(+(((maxValueY - minValueY) / y_steps) * i).toFixed(2));
let stepSizeX = (canvasWidth - offset_x * 2) / x_steps;
let stepSizeY = (canvasHeight - offset_y * 2) / y_steps;
let pixelY = ((maxValueY - minValueY) / y_steps) / stepSizeY;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
let ctx = canvas.getContext('2d');

window.onload = ()=> {
    container.appendChild(canvas);
    updateObjectGauss();
}

function randn_bm() {
    let u = 0, v = 0;
        while (u === 0)
            u = Math.random();
        while (v === 0)
            v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2 | 0;
};

function createObjRandNumbers(size) {
    let object = {};
    for (let i = 0; i < size; i++) {
        let rn = randn_bm();
        if (rn in object) object[rn] ++;
        else object[rn] = 1;
    }
    return object;
}

function drawTable(object) {
    container.appendChild(table);
    let tableHtml = "<thead><tr><th>Values:</th><th>Numbers:</th></tr></thead>"
    for (let [key, value] of Object.entries(object)) {
        tableHtml += (`<tr><td>${key}</td><td>${value}</td></tr>`);
    }
    table.innerHTML = tableHtml;
}

function drawGraph(object) {
    // set in object values Probability density
    let objectsGaussArr = [];
    for (let [valueX, numbers] of Object.entries(object)) {
        let valueY = numbers / objRandNumbersSize;
        let xx = offset_x + stepSizeX * (+valueX + maxValueX);
        let yy = canvasHeight - offset_y - (valueY / pixelY);
        objectsGaussArr.push({x: xx, y: yy});
    }
    objectsGaussArr.sort((a, b) => a.x > b.x ? 1 : -1);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw axises
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.textAlign = "left"
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(offset_x, 10);
    ctx.lineTo(offset_x - 5, 20); 
    ctx.moveTo(offset_x, 10);
    ctx.lineTo(offset_x + 5, 20);
    ctx.moveTo(offset_x, 10);
    ctx.lineTo(offset_x, canvasHeight - offset_y);
    ctx.lineTo(offset_x + 540, canvasHeight - offset_y);
    ctx.lineTo(offset_x + 530, canvasHeight - offset_y - 5);
    ctx.moveTo(offset_x + 540, canvasHeight - offset_y);
    ctx.lineTo(offset_x + 530, canvasHeight - offset_y + 5);
    ctx.stroke();
    ctx.font = 'bold 18px arial';
    ctx.fillText('Probability density', 60, 40);
    ctx.fillText('Values', 530, canvasHeight - offset_y - 10);

    // draw axises values
    ctx.fillStyle = "black";
    ctx.lineWidth = 1.0;
    ctx.font = 'normal 14px arial';
    // axises Probability density (Y)
    ctx.textAlign = "right"
    for (let i = 0; i < yValuesArr.length; i++) {
        let yy = canvasHeight - (offset_y + (stepSizeY * i));
        ctx.fillText(yValuesArr[i].toFixed(2), offset_x - 10, yy + 5); 
        ctx.beginPath(); 
        ctx.moveTo(offset_x - 5, yy); 
        ctx.lineTo(offset_x + 5, yy); 
        ctx.stroke();
    }
    // axises Values (X)
    ctx.textAlign = "center"
    for (let i = 0; i < xValuesArr.length; i++) {
        let xx = offset_x + (stepSizeX * i);
        ctx.fillText(xValuesArr[i], xx, canvasHeight - 25); 
        ctx.beginPath(); 
        ctx.moveTo(xx, canvasHeight - offset_y - 5); 
        ctx.lineTo(xx, canvasHeight - offset_y + 5); 
        ctx.stroke();
    }

    // draw points
    ctx.fillStyle = "blue";
    for (let step of objectsGaussArr) {
        ctx.beginPath();
        ctx.arc(step.x, step.y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }

    // draw lines
    ctx.strokeStyle = 'blue'; 
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo((objectsGaussArr[0].x), objectsGaussArr[0].y);
    for(let i = 0; i < objectsGaussArr.length - 1; i++) {
        let x_mid = (objectsGaussArr[i].x + objectsGaussArr[i + 1].x) / 2;
        let y_mid = (objectsGaussArr[i].y + objectsGaussArr[i + 1].y) / 2;
        let cp_x1 = (x_mid + objectsGaussArr[i].x) / 2;
        let cp_x2 = (x_mid + objectsGaussArr[i + 1].x) / 2;
        ctx.quadraticCurveTo(cp_x1, objectsGaussArr[i].y, x_mid, y_mid);
        ctx.quadraticCurveTo(cp_x2, objectsGaussArr[i + 1].y, objectsGaussArr[i + 1].x, objectsGaussArr[i + 1].y);
    }
    ctx.stroke();
}

function getNewNumber() {
    let num = +inputNumbers.value;
    if (!isNaN(num) && num > 0 && isFinite(num) && num < 10000000) {
        objRandNumbersSize = Math.ceil(num);
    } else inputNumbers.value = objRandNumbersSize;
}

function updateObjectGauss() {
    getNewNumber();
    let objRandNumbers = createObjRandNumbers(objRandNumbersSize);
    console.log(objRandNumbers);
    drawTable(objRandNumbers);
    drawGraph(objRandNumbers);
}