//Takes zipcode and generates an event emitter constructor with JSON of weather data for that zipcode.
//Uses forecast.io API.

var EventEmitter = require("events").EventEmitter;
var https = require("https");
var util = require("util");
var fs = require('fs');
var data = require('./data');
//api key for forecast.io;
var apiKey = '61023d1e74ec9feb8fd01ec0e62e3497';

function GetWeather(code){

	EventEmitter.call(this);

	weatherEmitter = this;

	//Connect to the API URL 
	var request = https.get("https://api.forecast.io/forecast/"+apiKey+"/"+data.retrieveLatLong(code), function(response){
		var body = "";

		//Read Data
		response.on('data', function(chunk){
			body += chunk;
			weatherEmitter.emit("data", chunk);
		})
		response.on("end", function(){
			//Parse the data
			var info = JSON.parse(body);
			weatherEmitter.emit("end", info);

		})
	
	});
}

util.inherits(GetWeather, EventEmitter);
module.exports.GetWeather = GetWeather;








