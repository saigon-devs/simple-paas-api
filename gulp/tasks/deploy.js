var gulp = require('gulp');
var util = require('util');

gulp.task('deploy', ['clean', 'browserify', 'bower', 'styles'], function(cb) {
    util.log("Completed!");
    return cb();
});

gulp.on('stop', function () {
    process.nextTick(function () {
        process.exit(0);
    });
});