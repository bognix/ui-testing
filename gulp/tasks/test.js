var gulp = require('gulp');
var spawn = require('child_process').spawn;


gulp.task('test', function() {
    var casperProcess = 'casperjs';
    var casperChild = spawn(casperProcess, ['casperRunner.js']);

    casperChild.stdout.on('data', function (data) {
        console.log('CasperJS:', data.toString().slice(0, -1));
    });

    casperChild.on('close', function (code) {
        console.log(code);
    });
});
