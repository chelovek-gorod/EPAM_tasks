"use strict";

const divOutput = document.getElementById("divOutput");
const btnArr = document.getElementsByTagName("button");

let cases = {
    string: [
        "String(123)",
        "String(-12.3)",
        "String(null)",
        "String(undefined)",
        "String(true)",
        "String(false)",
        "String(Symbol('new symbol'))",
        "'' + Symbol('new symbol')"
    ],
    bloolean: [
        "Boolean('')",
        "Boolean(' ')",
        "Boolean(0)",
        "Boolean(1)",
        "Boolean(2)",
        "Boolean(1.25)",
        "Boolean(-0)",
        "Boolean(NaN)",
        "Boolean(null)",
        "Boolean(undefined)",
        "Boolean([ ])",
        "Boolean({ })",
        "Boolean(Symbol('new symbol'))",
        "!!Symbol( )",
        "if (2) { }",
        "!!2",
        "2 || 'hello'"
    ],
    number: [
        "Number(123)",
        "Number('123')",
        "Number(null)",
        "Number(undefined)",
        "Number(true)",
        "Number(false)",
        "Number('')",
        "Number(' ')",
        "Number('\n')",
        "Number('12px')",
        "Number(Symbol('new symbol'))",
        "+ Symbol('new symbol')",
        "+'123'",
        "123 != '456'",
        "4 > '5'",
        "5 / null",
        "true | 0"
    ],
};

let js = true;
let onClear = false;
let line = 0;
let sign = 0;
let string = '';
let caseName = '';

function typing() {
    onClear = false;
    let n_line = 9 // used for line nuber 0...8, to writen as 01...09 (after line+1)
    sign = 0;
    if (js) {
        divOutput.innerHTML += `<span style="color:#00e7ff;">${line < n_line ? '0' + (line+1) : line+1} | </span>`;
        string = cases[caseName][line];
        js = false;
        setTimeout(typeSign, 60, divOutput);
    } else {
        let res = getSrtingFromCase(cases[caseName][line]);
        divOutput.innerHTML += `<span id="s${line}" style="color:${res.color}"></span><br>`;
        string = ' // ' + res.string;
        let span = document.getElementById('s' + line);
        line++;
        js = true;
        setTimeout(typeSign, 60, span);
    }
}

function typeSign(e) {
    if (!onClear) {
        if (string[sign] === "\n") e.innerHTML += "\\n";
        else e.innerHTML += string[sign];
        sign++;
        if (sign === string.length && line < cases[caseName].length) setTimeout(typing, 60);
        else if (sign !== string.length) setTimeout(typeSign, 30, e);
    }
}

function getSrtingFromCase (caseToString) {
    try {
        return {color: "#ffffff;", string: eval(caseToString)};
    }
    catch(error) {
        return {color: "#ff0000;", string: error};
    }
}

function changeType(type, id) {
    for (let btn of btnArr) btn.classList.remove("turnOn");
    id.classList.toggle("turnOn");
    onClear = true;
    js = true;
    line = 0;
    sign = 0;
    string = '';
    caseName = type;
    divOutput.innerHTML = "";
    setTimeout(typing, 150);
}