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
			if (documents.length > 0) {
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
					callback(null, addedUser);
					db.close();
				})
			});
		}
	})
}

module.exports = {
	isUnique: isUnique,
	addUser : addUser
}