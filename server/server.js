var express = require('express');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 8080;
var downloads = './downloads';


app.listen(port, function() {
	console.log("Listening on port: " + port);
});

// initialise downloads folder if needed
if (!fs.existsSync(downloads)) {
	fs.mkdirSync(downloads);
}