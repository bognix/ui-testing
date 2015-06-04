var gulp = require('gulp');
var spawn = require('child_process').spawn;
var loadTestCase = require('../utils/loadTestCases');
var util = require('util');
var resemble = require('node-resemble-js');
var fs = require('fs');

gulp.task('test', function() {
    var config = loadTestCase();
    var casperProcess = 'casperjs';
    resemble.outputSettings({
        errorColor: {
            red: 255,
            green: 0,
            blue: 255
        },
        errorType: 'movement',
        transparency: 0.3
    });

    var casperChild;
    for (var i=0; i < config.length; i++) {
        var testCase = config[i];
        var args = ['casperRunner.js'];
        args.push(util.format('--url=%s', testCase.url));
        args.push(util.format('--out=%s', 'images/test-output/' + testCase.name + '.png'));
        args.push(util.format('--selector=%s', testCase.selector));
        args.push(util.format('--width=%s', testCase.viewport.width));
        args.push(util.format('--height=%s', testCase.viewport.height));

        casperChild = spawn(casperProcess, args, {detached: true});

        casperChild.stdout.on('data', function (data) {
            console.log('CasperJS:', data.toString().slice(0, -1));
        });

        casperChild.on('close', function (code) {
            var diff = resemble('images/test-output/' + testCase.name + '.png').compareTo(testCase.baseline).onComplete(function(data) {
                data.getDiffImage().pack().pipe(fs.createWriteStream('images/results/' + testCase.name + '.png'));
            });
        });

    }
});
