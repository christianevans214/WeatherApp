var fs = require('fs');
function mergeValues (values, content){
	for (var key in values){
		content = content.replace("{{"+ key +"}}", values[key]);
	};
	return content;
}

function view(file, values, response){
	var fileRead = fs.readFileSync("./design/" + file + ".html", {encoding: "utf8"});
	var newFile = mergeValues(values, fileRead);
	response.write(newFile);
}

module.exports.view = view;