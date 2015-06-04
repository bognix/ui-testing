var fs = require('fs');
var globule = require('globule');

function loadTestCases() {
    var jsonsArr = [];
    var files = globule.find(__dirname + '/../../tests/**/*Test.json');
    for (var i=0; i < files.length; i++) {
        jsonsArr.push(JSON.parse(fs.readFileSync(files[i], 'utf-8')));
    }

    return jsonsArr;
}

module.exports = loadTestCases;
