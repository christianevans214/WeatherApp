
var profile= require("./profileTest.js");
var render = require("./render");
var querystring = require("querystring");
var data = require("./data");

/*var dun = new profile.GetWeather(12804);
dun.on("end", function(dunProfile){
	console.log(dunProfile.currently.summary);
});*/



function home(request, response){
	if (request.method.toLowerCase() === "get"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		render.view("header", {}, response);
		render.view("body", {}, response);
		response.end();
	} else {
		//if url == "/" && POST
		request.on("data", function(postBody){
			var query = querystring.parse(postBody.toString())
			response.writeHead(303, {'Location': "/" + query.zipcode});
			response.end();
		})
	}
}


function zip(request, response){
	var zipCode = request.url.substring(1);
		if (request.method.toLowerCase() === "get"){
			if (zipCode.length>0){
			zipCode = +zipCode;
			response.writeHead(200, {"Content-Type": "text/html"});
			render.view("header", {}, response);

			//get JSON from forecast.io
			var weatherProfile = new profile.GetWeather(zipCode);

			weatherProfile.on("end", function(weatherJSON){
					var description = "It's currently " + Math.round(weatherJSON.currently.temperature) + "&deg;F. The forecast is " + weatherJSON.currently.summary.toLowerCase() + ", with a " + weatherJSON.currently.precipProbability*100 + "% chance of precipitation";
					var values = {
					location: data.retrieveTown(zipCode), 
					weatherDescription: description
					};
					render.view("search", values, response);
					render.view("body", {}, response);
					response.end();

			})

			}

		}
	
}

module.exports.home = home;
module.exports.zip = zip;