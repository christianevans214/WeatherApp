var fs = require('fs');
var https = require('https');

//forecast.io API key
var apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';
//read in zip code data
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
function retrieveLatLong(zipcode){
	return zipCodesLibrary[zipcode][0];
}

//retrieves city,state from zipCodesLibrary
function retrieveTown(zipcode){
	return zipCodesLibrary[zipcode][1];
}

//prints weather summary
function printSummary(city, temperature, forecast, chancePrecip){
	var summary = "In " + city + ", it's currently " + Math.round(temperature) + "oF. The forecast is " + forecast.toLowerCase() + ", with a " + chancePrecip*100 + "% chance of precipitation";
	console.log(summary);
}

//function to print out error message(s)
function printError(error){
	console.error(error.message);
}

//receives weather information from forecast.io and prints.
function getWeather(code){
	if (zipCodesLibrary.hasOwnProperty(code)) {
		var request = https.get("https://api.forecast.io/forecast/"+apiKey+"/"+retrieveLatLong(code), function(response){
			var body = "";
			response.on("data", function(chunk){
				body += chunk;
			});
			response.on("end", function(){
				var info = JSON.parse(body);
				printSummary(retrieveTown(code), info.currently.temperature, info.currently.summary, info.currently.precipProbability);
			})
		})
	}
	else printError({'message': "That zipcode isn't valid"})
	
}

module.exports.getWeather = getWeather;