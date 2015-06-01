
var fs = require('fs');
var profile = require('./profile.js');
var zipArr = process.argv.slice(2);
zipArr.forEach(profile.getWeather);
