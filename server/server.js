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
			res.type('json')
			res.status(400);
			var object = {
				error: err.message
			}
			res.end(JSON.stringify(object));
		} else {
			res.type('json')
			res.status(200);
			res.end(JSON.stringify(data));
		}
	});
});

// always returns success
app.delete('/users', function(req, res) {
	var username = req.body.username;
	server.removeUser(username, function(err) {
		if (err) {
			res.type('json')
			res.status(400);
			var object = {
				error: err.message
			}
			res.end(JSON.stringify(object));
		} else {
			res.status(200);
			res.end();
		}
	})
})

app.get('/users/:username/openings', function(req, res) {
	var username = req.params.username;
	server.searchForUsername(username, function(err, data) {
		if (err || data.length == 0) {
			res.type('json')
			res.status(400);
			var object = {
				error : err != null ? err.message : "No user found"
			}
			res.end(JSON.stringify(object));
		} else {
			res.type('json');
			res.status(200);
			var object = {
				openings: data[0].openings
			}
			res.end(JSON.stringify(object));
		}
	});
});

// update settings
app.put('/users/:username/openings', function(req, res) {
	var username = req.params.username;
	var openings = req.body.openings;
	if (openings != undefined && openings != null) {
		server.setOpenings(username, openings, function(err) {
			if (err) {
				res.type('json')
				res.status(400);
				var object = {
					error: err.message
				}
				res.end(JSON.stringify(object));
			} else {
				res.status(200);
				res.end();
			}
		});
	}
});

app.listen(port, function() {
	// initialise downloads folder if needed
	if (!fs.existsSync(downloads)) {
		fs.mkdirSync(downloads);
	}
	console.log('Listening on port: ' + port);
});
