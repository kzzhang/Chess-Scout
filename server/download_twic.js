'use strict';

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var unzip = require('unzip');

function downloadFile(version, downloadCallback) {
	var destination = './downloads/twic' + version + '.zip';
	var url = 'http://www.theweekinchess.com/zips/twic' + version + 'g.zip';
	request({url: url, encoding: null}, function(error, response, body) {
  		if (error) {
  			throw error;
  		}
  		fs.writeFile(destination, body, function(error) {
    		console.log("File written!");
    		downloadCallback();
  		});
	});
}

function findLatestVersion(callback) {
	var url = 'http://theweekinchess.com/twic';
	request({url: url}, function(error, response, body) {
		if (error) {
			throw error;
		}
		const $ = cheerio.load(body);
		var temp = $('h2').text();

		for (var i = 0; i<temp.length; i++) {
			if (isNumeric(temp[i])) {
				callback(temp.substring(i, i+4));
				break;
			} else if (i === temp.length - 1) {
				callback('-1');
				break;
			}
		}
	});
}

function unzipFile(version, zipCallback) {
	var readStream = fs.createReadStream('./downloads/twic' + version + '.zip');
	readStream.pipe(unzip.Parse())
		.on('entry', function(entry) {
			var fileName = entry.path;
			if (fileName === 'twic' + version + '.pgn') {
				entry.pipe(fs.createWriteStream('./downloads/twic' + version + '.pgn'));
				console.log('wrote file');
			} else {
				entry.autodrain();
			}
		})
		.on('close', zipCallback.bind());
}

function isNumeric(letter) {
	return (letter >= '0' && letter <= '9');
}

module.exports = {
	download: downloadFile,
	findLatestVersion: findLatestVersion,
	unzipFile: unzipFile
}