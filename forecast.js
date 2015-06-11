//Create server and initialize app
var http = require("http");
//var profile = require('./profile.js');
var router = require('./router.js');
var render = require('./render.js')

var server = http.createServer(function(request, response){
	if (request.url === "/"){
		router.home(request, response);
	}
	else if (/\/\d+/.test(request.url)) {
		router.zip(request, response);

	}

});

server.listen(8080, 'localhost');
console.log('server running at localhost:8080');

