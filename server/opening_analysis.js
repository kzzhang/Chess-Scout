'use strict';

var pgn_parser = require('./pgn_parser.js');

pgn_parser.parseFile('./assets/stub/twic1189.pgn', function(games) {
	games.forEach(function(game){
		console.log(game['Opening']);
		//TODO
	});
});

function analyze(game) {
	//TODO: add comparison check against eco.json and return opening if found
}

module.exports = analyze;