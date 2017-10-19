var uri = process.env.MONGODB_URI; //|| 'mongodb://localhost:3000';
var url = uri + '/data';
var mongo = require('mongodb').MongoClient;
var user = require('./user.js')

// callback takes one arg: err
function isUnique(username, email, callback) {
	var count = 2;
	var username;
	var email;
	searchForUsername(username, function(err, data){
		if (err) callback(err);
		else {
			username = data;
			count -=1;
			if (count == 0) {
				if (username.length != 0) {
					callback(new Error("Username not unique"));
				} else if (email.length != 0) {
					callback(new Error("Email not unque"));
				} else {
					callback(null);
				}
			}
		}
	});
	searchForEmail(email, function(err, data) {
		if (err) callback(err);
		else {
			email = data;
			count -=1;
			if (count == 0) {
				if (username.length != 0) {
					callback(new Error("Username not unique"));
				} else if (email.length != 0) {
					callback(new Error("Email not unque"));
				} else {
					callback(null);
				}
			}
		}
	});
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
				if (err) {
					callback(err, null);
					db.close();
				} else {
					var collection = db.collection('users');
					collection.insert(addedUser, function(err, data) {
						if (err) callback(err, null);
						else {
							callback(null, addedUser);
						}
						db.close();
					})
				}
			});
		}
	})
}

// callback takes one arg: error
function removeUser(username, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err);
			db.close();
		} else {
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
		}
	});
}

// user must exist
// callback takes two args: error and array of strings
// function getOpenings(username, callback) {
// 	mongo.connect(url, function(err, db) {
// 		if (err) {
// 			callback(err, null);
// 			db.close();
// 		} else {
// 			var collection = db.collection('users');
// 			collection.find({
// 				username: username
// 			}, {
// 				openings: 1
// 			}).toArray(function(err, data) {
// 				if (err) callback(err, null);
// 				else {
// 					if (data.length == 0) callback(new Error("No user found"), null);
// 					else callback(null, data[0].openings);
// 				}
// 				db.close();
// 			});
// 		}
// 	});
// }

// username: string
// opening: array of strings
// callback takes one arg: error
function setOpenings(username, openings, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err);
			db.close();
		} else {
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
		}
	});
}

// checks if password is correct
// callback takes two args: error, result
// result is true if login credentials are valid, else false
// returns error and false if username not found
function passwordValid(username, password, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err, null);
			db.close();
		} else {
			var collection = db.collection('users');
			collection.find({
				username: username
			}).toArray(function(err, data) {
				if (err) { 
					callback(err, null);
				} else if (documents.length == 0) {
					callback(new Error("No user found"), false);
				} else {
					if (data[0].username == username) callback(null, true);
					else callback(null, false);
				}
				db.close();
			});
		}
	});
}

// check if username exists
// callback takes two args: error, result
// result returns list of user objects with input username (should be max length 1)
function searchForUsername(username, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err, null);
			db.close();
		} else {
			var collection = db.collection('users');
			collection.find({
				username: username
			}).toArray(function(err, data) {
				if (err) { 
					callback(err, null);
				} else {
					callback(null, data);
				}
				db.close();
			});
		}
	});
}

// check if email exists
// callback takes two args: error, result
// result returns list of user objects with input email (should be max length 1)
function searchForEmail(email, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err, null);
			db.close();
		} else {
			var collection = db.collection('users');
			collection.find({
				email: email
			}).toArray(function(err, data) {
				if (err) { 
					callback(err, null);
				} else {
					callback(null, data);
				}
				db.close();
			});
		}
	});
}

// callback takes one arg: error
function setPassword(username, password, callback) {
	mongo.connect(url, function(err, db) {
		if (err) {
			callback(err);
			db.close();
		} else {
			var collection = db.collection('users');
			collection.update({
				username: username
			}, {
				$set: {
					password: password
				}
			}, function(err, data) {
				if (err) callback(err);
				else callback(null);
				db.close();
			});
		}
	});
}

module.exports = {
	addUser : addUser,
	removeUser : removeUser,
	// getOpenings : getOpenings,
	setOpenings : setOpenings,
	setPassword : setPassword,
	searchForEmail : searchForEmail,
	searchForUsername : searchForUsername
}