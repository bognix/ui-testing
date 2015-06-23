var globule = require('globule');
var fs = require('fs');

function loadTestCaseAsync(callback) {
    var files = globule.find(__dirname + '/../../tests/**/*Test.json');
    for (var i=0; i < files.length; i++) {
        fs.readFile(files[i], 'utf-8', function(err, data) {
            json = JSON.parse(data, 'utf-8');
            callback(json)
        });
    }
}

module.exports = {
    loadTestCaseAsync: loadTestCaseAsync
};
