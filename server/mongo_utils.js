var uri = process.env.MONGODB_URI || 'mongodb://localhost:3000';
var url = uri + '/data';
var mongo = require('mongodb').MongoClient;
var user = require('./user.js')

function isUnique(username, email, callback) {
	mongo.connect(url, function(err, db) {
		if (err) callback(err, null);
		var collection = db.collection('users');
		collection.find({
			username: username,
			email: email
		}).toArray(function(err, documents){
			if (err) callback(err);
			else if (documents.length > 0) {
				callback(new Error("Duplicate username or email"));
			} else {
				callback(null);
			}
			db.close();
		});
	})
}

// callback takes two args: error, and user object returned
function addUser(argMap, callback) {
	var addedUser = new user(argMap);
	if (!addedUser.assert()) {
		callback(new Error("Username and email must be specified"), null);
	} 
	isUnique(addedUser.username, addedUser.email, function(err) {
		if (err) callback(err, null);
		else {
			mongo.connect(url, function(err, db) {
				if (err) callback(err, null);
				var collection = db.collection('users');
				collection.insert(addedUser, function(err, data) {
					if (err) callback(err, null);
					else {
						callback(null, addedUser);
					}
					db.close();
				})
			});
		}
	})
}

// callback takes one arg: error
function removeUser(username, callback) {
	mongo.connect(url, function(err, db) {
		if (err) callback(err);
		var collection = db.collection('users');
		collection.remove({
			username: username
		}, function(err, data) {
			if (err) callback(err);
			else {
				callback(null);
			}
			db.close();
		});
	});
}

// user must exist
// callback takes two args: error and array of strings
function getOpenings(username, callback) {
	mongo.connect(url, function(err, db) {
		if (err) callback(err, null);
		var collection = db.collection('users');
		collection.find({
			username: username
		}, {
			openings: 1
		}).toArray(function(err, data) {
			if (err) callback(err, null);
			else {
				if (data.length == 0) callback(new Error("No user found"), null);
				else callback(null, data[0].openings);
			}
			db.close();
		});
	});
}

// username: string
// opening: array of strings
// callback takes one arg: error
function updateOpenings(username, openings, callback) {
	mongo.connect(url, function(err, db) {
		if (err) callback(err);
		var collection = db.collection('users');
		collection.update({
			username: username
		}, {
			$set: {
				openings: openings
			}
		}, function(err, data) {
			if (err) callback(err);
			else callback(null);
			db.close();
		});
	});
}

module.exports = {
	addUser : addUser,
	removeUser : removeUser,
	getOpenings : getOpenings,
	updateOpenings : updateOpenings
}