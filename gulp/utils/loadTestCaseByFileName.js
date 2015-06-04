var fs = require('fs');
var globule = require('globule');

function loadTestCaseByName(fileName) {
	var json;
	var file = globule.find(__dirname + '/../../tests/**/' + fileName + '.json');
	if (file.length > 1) {
		console.log('More than one file matching name');
		return;
	}

	return JSON.parse(fs.readFileSync(file[0], 'utf-8'));
}

module.exports = loadTestCaseByName;
