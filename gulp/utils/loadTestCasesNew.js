var fs = require('fs');

function loadTestCases() {

    return fs.readFileSync(__dirname + '/../../tests/**/*Test.json', 'utf-8');
}

module.exports = loadTestCases;