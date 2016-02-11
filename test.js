var fs = require('fs');
var crypto = require('crypto');

function revArray(inputArr) {
	var output = [];
	for(i in inputArr) {
		output.push(revHash(inputArr[i]));
	}
	return output;
}

var filename = 'README.md';
var entryRegex = /\*\s[a-zA-Z\s]*\s\[.*\]\(.*\)/g;

// read the file from the filesystem
fs.readFile(filename, function(err, data) {
	if(err) {
		console.error(err);
		process.exit(1);
	} else {
		// isolate the part of the file that we want
		// to analyse
		var fileData = data.toString();

		var startString = "<!--ALPHA-->";
		var endString = "<!--ALPHAEND-->";
		var startIndex = fileData.search(startString) + startString.length;
		var endIndex = fileData.search(endString);

		var reqSubstr = fileData.substr(startIndex, endIndex);

		// make sure that start and end strings are not
		// a part of the extracted string
		reqSubstr = reqSubstr.replace(startString, '').replace(endString, '');

		// split using a newline to get the list of entries
		var lines = reqSubstr.split('\n');

		// remove all the empty string occurences from the list
		while((remIndex = lines.indexOf('')) != -1) {
			lines.splice(remIndex, 1);
		}

		// check if all entries match regex
		var checkFormat = lines.slice();

		for(i in checkFormat) {
			if(!checkFormat[i].match(entryRegex)){
				console.log("One of the entries does not match the format!");
				console.log("Fix this entry: ");
				console.log("--------------------");
				console.log(checkFormat[i]);
				process.exit(1);
			}
		}

		// make a copy of the list that we will sort
		var copy = lines.slice();
		copy.sort();

		// calculate the SHA256 hash of the string versions
		// of the two lists
		orgHash = crypto.createHash('sha256').update(lines.toString(), 'utf8').digest('hex');
		sortedHash = crypto.createHash('sha256').update(copy.toString(), 'utf8').digest('hex');

		if(orgHash !== sortedHash) {
			process.exit(1);
		} else {
			process.exit();
		}
	}
});
