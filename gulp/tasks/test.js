var gulp = require('gulp');
var loader = require('../utils/loadTestCases');

gulp.task('test', function() {
    loader.loadTestCaseAsync();

});
