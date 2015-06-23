var gulp = require('gulp');
var spawn = require('child_process').spawn;
var loader = require('../utils/loadTestCases');
var util = require('util');
var fs = require('fs');

gulp.task('baselines', function() {
    function createBaselines(testCase) {
        var casperProcess = 'casperjs';

        var args = ['casperRunner.js'];
        args.push(util.format('--url=%s', testCase.url));
        args.push(util.format('--out=%s', testCase.baseline));
        args.push(util.format('--selector=%s', testCase.selector));
        args.push(util.format('--width=%s', testCase.viewport.width));
        args.push(util.format('--height=%s', testCase.viewport.height));

        var casperChild = spawn(casperProcess, args);

        casperChild.stdout.on('data', function (data) {
            console.log('CasperJS:', data.toString().slice(0, -1));
        });

        casperChild.on('close', function (code) {
            console.log('Baseline saved');
        });
    }
    loader.loadTestCaseAsync(createBaselines);
});
