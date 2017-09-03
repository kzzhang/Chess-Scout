'use strict';

var pgn = require('./pgn.js');
var fs = require('fs');
var readLine = require('readline');

var resultsEnum = {
	WHITE_WIN: '1-0',
	BLACK_WIN: '0-1',
	DRAW: '1/2-1/2'
}

function parseFile(file, parseCallback) {
	// Data to save
	var games = [];
	var currentGameArgs = {};
	var moves = '';

	var ifstream = fs.createReadStream(file);
	var rl = readLine.createInterface({
		input: ifstream
	})

	rl.on('line', function(line) {
		if (line[0] === '[') {
			var data = line.substring(1, line.length - 1);
			var firstSpace = data.indexOf(" ");
			var attribute = data.substring(0, firstSpace);
			var content = data.substring(firstSpace + 2, data.length - 1);
			currentGameArgs[attribute] = content;
		} else if (line.length > 0) {
			moves += line;
			if (containsResult(line)) {
				currentGameArgs['Moves'] = moves;
				games.push(new pgn(currentGameArgs));
				currentGameArgs = {};
				moves = '';
			}
		}
	});

	rl.on('close', function() {
		parseCallback(games);
	});

	ifstream.on('end', function() {
		rl.close();
	});
}

function containsResult(input) {
	for (var result in resultsEnum) {
		var value = resultsEnum[result];
		if (input.indexOf(value) != -1) {
			return true;
		}
	}
	return false;
}

module.exports = parseFile;