var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;
var downloads = './downloads';
var server = require('./mongo_utils.js')

/**
* Initialize directories and mongodb server
**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', function(req, res) {
	var user = {
		email: req.body.email,
		username: req.body.username,
		openings: req.body.openings
	};
	server.addUser(user, function(err, data) {
		if (err) {
			res.status(400);
			res.end(err.message);
		} else {
			res.type('json')
			res.status(200);
			res.end(JSON.stringify(data));
		}
	});
});

app.listen(port, function() {
	// initialise downloads folder if needed
	if (!fs.existsSync(downloads)) {
		fs.mkdirSync(downloads);
	}
	console.log("Listening on port: " + port);
});
