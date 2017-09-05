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

/**
*** Sort list of games (input) by opening
*** Returns games found with specified opening
*** Opening and Eco strings are all optional -> Opening strings should follow format from eco.json file
**/
function findGames(games, opening, eco) {
	var parsed = [];
	var indexComma = opening.indexOf(',');
	var abbreviatedOpening = '';
	var temp = opening;
	var variation = undefined;
	if (indexComma != -1) {
		variation = temp.substring(indexComma + 2, temp.length);
		temp = temp.substring(0, indexComma);
	}
	var mainLine = temp;

	while (temp.indexOf(' ') != -1) {
		abbreviatedOpening += temp[0];
		temp = temp.substring(temp.indexOf(' ') + 1, temp.length);
	}
	abbreviatedOpening += temp[0];
	games.forEach(function(individualGame) {
		if (individualGame['Eco'] == undefined || individualGame['Eco'].toUpperCase() === eco.toUpperCase()) {
			if (individualGame['Opening'] == undefined) {
				parsed.push(individualGame);
			} else {
				if (individualGame['Opening'].toUpperCase().indexOf(mainLine.toUpperCase()) != -1 
					|| individualGame['Opening'].toUpperCase().indexOf(abbreviatedOpening.toUpperCase()) != -1) {
					if (variation == null || individualGame['Variation'] == undefined || variation.toUpperCase() === individualGame['Variation']) {
						parsed.push(individualGame);
					}
				}
			}
		}
	});
	return parsed;
}

/**
*** Function to determine whether or not a string contains a result tag (1-0, 1/2-1/2, 0-1)	
*** Returns true if found, false otherwise
**/
function containsResult(input) {
	for (var result in resultsEnum) {
		var value = resultsEnum[result];
		if (input.indexOf(value) != -1) {
			return true;
		}
	}
	return false;
}

module.exports = {
	parseFile: parseFile,
	findGames: findGames
}