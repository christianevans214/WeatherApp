var EventEmitter = require("events").EventEmitter;
var https = require("https");
var util = require("util");
var fs = require('fs');
var data = require('./data');

var apiKey = '61023d1e74ec9feb8fd01ec0e62e3497';






function GetWeather(code){

	
	/*var apiKey = '61023d1e74ec9feb8fd01ec0e62e3497';

	var zipData = fs.readFileSync("zipcode.csv", "utf-8");
	//parses zipcode data and returns an object of arrays with latitude/longitude string and city string. 
	var zipCodesLibrary = (function (){
		var zipObject = {};
		zipData = zipData.split("\n");
		zipData.pop();
		for (var i = 1; i<zipData.length; i++){
			zipData[i] = zipData[i].replace(/\"/g, "").split(",");
			zipObject[zipData[i][0]] = [zipData[i][3] + "," + zipData[i][4], zipData[i][1] + ", " +zipData[i][2]];
		};
			
		return zipObject;
	})();

	//retrieves latitude and longitude from zipCodesLibrary
	function retrieveLatLong(code){
		return zipCodesLibrary[code][0];
	}

	//retrieves city,state from zipCodesLibrary
	function retrieveTown(code){
		return zipCodesLibrary[code][1];
	}*/

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








