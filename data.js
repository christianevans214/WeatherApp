var fs = require('fs');



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
}

module.exports.retrieveLatLong = retrieveLatLong;
module.exports.retrieveTown = retrieveTown;