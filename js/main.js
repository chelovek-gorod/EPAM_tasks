"use strict";

const inputNumbers = document.getElementById("inputNumbers");
let objRandNumbersSize = +inputNumbers.value; 

const container = document.getElementById("container");
const table = document.createElement('table');
const canvas = document.createElement('canvas');

const canvasSettings = {
    width: 600,
    height: 600,
    offset_x: 50,
    offset_y: 50,
};

let minValueX = -10;
let maxValueX = 10;  // 91 setProbability(object)
let minValueY = 0;
let maxValueY = 1;
let x_steps = 20;
let y_steps = 20;
let xValuesArr = []; // 139 axisesValuesX()
for (let i = minValueX; i <= maxValueX; i++)
    xValuesArr.push(i);
let yValuesArr = []; // axisesValuesY()
for (let i = 0; i <= y_steps; i++)
    yValuesArr.push(+(((maxValueY - minValueY) / y_steps) * i).toFixed(2));
let stepSizeX = (canvasSettings.width - canvasSettings.offset_x * 2) / x_steps;   // 91 setProbability(object), 139 axisesValuesX()
let stepSizeY = (canvasSettings.height - canvasSettings.offset_y * 2) / y_steps;  // 126 axisesValuesY()
let pixelY = ((maxValueY - minValueY) / y_steps) / stepSizeY;                     // 91 setProbability(object)

canvas.width = canvasSettings.width;
canvas.height = canvasSettings.height;
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
    let tableHtml = "<thead><tr><th>Values:</th><th>Numbers:</th></tr></thead>";
    let objArr = Object.entries(object);
    for (let [key, value] of objArr) {
        tableHtml += (`<tr><td>${key}</td><td>${value}</td></tr>`);
    }
    table.innerHTML = tableHtml;
}

function drawGraph(object) {
    let objectsGaussArr = setProbability(object);
    
    ctx.clearRect(0, 0, canvasSettings.width, canvasSettings.height);

    drawAxises();
    
    ctx.fillStyle = "black";
    ctx.lineWidth = 1.0;
    ctx.font = 'normal 14px arial';

    axisesValuesY();
    axisesValuesX();
    
    drawPoints(objectsGaussArr)
    drawLines(objectsGaussArr)
    
    ctx.stroke();
}

function setProbability(object) {
    let gaussArr = [];
    let objArr = Object.entries(object);
    for (let [valueX, numbers] of objArr) {
        let valueY = numbers / objRandNumbersSize;
        let xx = canvasSettings.offset_x + stepSizeX * (+valueX + maxValueX);
        let yy = canvasSettings.height - canvasSettings.offset_y - (valueY / pixelY);
        gaussArr.push({x: xx, y: yy});
    }
    gaussArr.sort((a, b) => a.x > b.x ? 1 : -1);
    return gaussArr;
}

function drawAxises() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.textAlign = "left"
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(canvasSettings.offset_x, 10);
    ctx.lineTo(canvasSettings.offset_x - 5, 20); 
    ctx.moveTo(canvasSettings.offset_x, 10);
    ctx.lineTo(canvasSettings.offset_x + 5, 20);
    ctx.moveTo(canvasSettings.offset_x, 10);
    ctx.lineTo(canvasSettings.offset_x, canvasSettings.height - canvasSettings.offset_y);
    ctx.lineTo(canvasSettings.offset_x + 540, canvasSettings.height - canvasSettings.offset_y);
    ctx.lineTo(canvasSettings.offset_x + 530, canvasSettings.height - canvasSettings.offset_y - 5);
    ctx.moveTo(canvasSettings.offset_x + 540, canvasSettings.height - canvasSettings.offset_y);
    ctx.lineTo(canvasSettings.offset_x + 530, canvasSettings.height - canvasSettings.offset_y + 5);
    ctx.stroke();
    ctx.font = 'bold 18px arial';
    ctx.fillText('Probability density', 60, 40);
    ctx.fillText('Values', 530, canvasSettings.height - canvasSettings.offset_y - 10);
}

function axisesValuesY() {
    ctx.textAlign = "right"
    const yArrLength = yValuesArr.length;
    for (let i = 0; i < yArrLength; i++) {
        let yy = canvasSettings.height - (canvasSettings.offset_y + (stepSizeY * i));
        ctx.fillText(yValuesArr[i].toFixed(2), canvasSettings.offset_x - 10, yy + 5); 
        ctx.beginPath(); 
        ctx.moveTo(canvasSettings.offset_x - 5, yy); 
        ctx.lineTo(canvasSettings.offset_x + 5, yy); 
        ctx.stroke();
    }
}

function axisesValuesX() {
    ctx.textAlign = "center"
    const xArrLength = xValuesArr.length;
    for (let i = 0; i < xArrLength; i++) {
        let xx = canvasSettings.offset_x + (stepSizeX * i);
        ctx.fillText(xValuesArr[i], xx, canvasSettings.height - 25); 
        ctx.beginPath(); 
        ctx.moveTo(xx, canvasSettings.height - canvasSettings.offset_y - 5); 
        ctx.lineTo(xx, canvasSettings.height - canvasSettings.offset_y + 5); 
        ctx.stroke();
    }
}

function drawPoints(objectsGaussArr) {
    ctx.fillStyle = "blue";
    for (let step of objectsGaussArr) {
        ctx.beginPath();
        ctx.arc(step.x, step.y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function drawLines(objectsGaussArr) {
    ctx.strokeStyle = 'blue'; 
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo((objectsGaussArr[0].x), objectsGaussArr[0].y);
    const objGaussArrLength = objectsGaussArr.length;
    for(let i = 0; i < objGaussArrLength - 1; i++) {
        let x_mid = (objectsGaussArr[i].x + objectsGaussArr[i + 1].x) / 2;
        let y_mid = (objectsGaussArr[i].y + objectsGaussArr[i + 1].y) / 2;
        let cp_x1 = (x_mid + objectsGaussArr[i].x) / 2;
        let cp_x2 = (x_mid + objectsGaussArr[i + 1].x) / 2;
        ctx.quadraticCurveTo(cp_x1, objectsGaussArr[i].y, x_mid, y_mid);
        ctx.quadraticCurveTo(cp_x2, objectsGaussArr[i + 1].y, objectsGaussArr[i + 1].x, objectsGaussArr[i + 1].y);
    }
}

function getNewNumber() {
    let num = +inputNumbers.value;
    if (!isNaN(num) && num > 0 && isFinite(num) && num < 10000000) {
        objRandNumbersSize = Math.ceil(num);
    } else {
        inputNumbers.value = objRandNumbersSize;
    }
}

function updateObjectGauss() {
    getNewNumber();
    let objRandNumbers = createObjRandNumbers(objRandNumbersSize);
    console.log(objRandNumbers);
    drawTable(objRandNumbers);
    drawGraph(objRandNumbers);
}
