var gulp = require('gulp');
var spawn = require('child_process').spawn;


gulp.task('baseline', function() {
    var casperProcess = 'casperjs';
    var casperChild = spawn(casperProcess, ['casperRunner.js', '--url=http://wikia.com', '--out=images/baseline/ipsum.png', '--selector=#globalNavigation']);

    casperChild.stdout.on('data', function (data) {
        console.log('CasperJS:', data.toString().slice(0, -1));
    });

    casperChild.on('close', function (code) {
        console.log('** Exit code: ' + code + ' **');
        console.log('** Screenshots created **');
    });
});
