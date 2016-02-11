var fs = require('fs');
var crypto = require('crypto');

function revArray(inputArr) {
	var output = [];
	for(i in inputArr) {
		output.push(revHash(inputArr[i]));
	}
	return output;
}

filename = 'README.md';

fs.readFile(filename, function(err, data) {
	if(err) {
		console.error(err);
		return;
	} else {
		var fileData = data.toString();
		var startString = "<!--ALPHA-->";
		var endString = "<!--ALPHAEND-->";
		var startIndex = fileData.search(startString) + startString.length;
		var endIndex = fileData.search(endString);
		var reqSubstr = fileData.substr(startIndex, endIndex);
		reqSubstr = reqSubstr.replace(startString, '').replace(endString, '');

		var lines = reqSubstr.split('\n');

		while((remIndex = lines.indexOf('')) != -1) {
			lines.splice(remIndex, 1);
		}

		var copy = lines.slice();
		copy.sort();

		orgHash = crypto.createHash('sha256').update(lines.toString(), 'utf8').digest('hex');
		sortedHash = crypto.createHash('sha256').update(copy.toString(), 'utf8').digest('hex');

		if(orgHash !== sortedHash) {
			process.exit(1);
		} else {
			process.exit();
		}
	}
});
