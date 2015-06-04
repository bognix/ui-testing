var gulp = require('gulp');
var spawn = require('child_process').spawn;
//var loadTestCase = require('../utils/loadTestCases');
var loadTestCase = require('../utils/loadTestCasesNew');
var util = require('util');
var resemble = require('node-resemble-js');
var fs = require('fs');

gulp.task('test', function() {
    var config = JSON.parse(loadTestCase());
    var casperProcess = 'casperjs';

    for (var testCase in config) {
        console.log(testCase);
        var args = ['casperRunner.js'];
        args.push(util.format('--url=%s', config[testCase].url));
        args.push(util.format('--out=%s', 'images/test-output/' + testCase + '.png'));
        args.push(util.format('--selector=%s', config[testCase].selector));
        args.push(util.format('--width=%s', config[testCase].viewport.width));
        args.push(util.format('--height=%s', config[testCase].viewport.height));

        var casperChild = spawn(casperProcess, args);

        casperChild.stdout.on('data', function (data) {
            console.log('CasperJS:', data.toString().slice(0, -1));
        });

        casperChild.on('close', function (code) {
            resemble.outputSettings({
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 255
                },
                errorType: 'movement',
                transparency: 0.3
            });

            var diff = resemble('images/test-output/' + testCase + '.png').compareTo(config[testCase].baseline).onComplete(function(data) {
                data.getDiffImage().pack().pipe(fs.createWriteStream('diff.png'));
            });
        });

    }
});
