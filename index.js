'use strict'; 

const fetch = require('node-fetch');
const weather = require('weather-js');

let urlGetIp = "http://www.ip-fetch.com";

fetch(urlGetIp)
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        let startIp = data.indexOf('<span id="ip">') + '<span id="ip">'.length;
        let endIp = data.indexOf('</span>', startIp);
        let ip = data.substring(startIp, endIp);
        //console.log(ip);
        getCity(ip);
    })
    .catch(error => {
        console.log('ERROR : get IP request');
    });

function getCity(ip) {
    fetch('http://api.ipstack.com/' + ip + '?access_key=917606229635ec5d3fd3f638bc89b16e')
    .then((response) => {
        return response.json();
    })
    .then((date) => {
        //console.log(date.city);
        getWeather(date.city);
    })
    .catch(error => {
        console.log('ERROR : get CITY request');
    });
}

function getWeather(city){
    weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        outputWeather(result[0].location, result[0].current);
        //console.log(JSON.stringify(result, null, 2));
    });
}

function outputWeather(location, current) {
    console.log('\n--------\n\n  Hi, friend!\n');
    console.log('  Todey in ' + location.name + ' is ' + current.skytext);
    console.log('  Temperature: ' + current.temperature + ' С (feels like ' + current.feelslike + ' С)');
    console.log('  Wind: ' + current.winddisplay + ', humidity: ' + current.humidity + ' %\n\n--------');
}