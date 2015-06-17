var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config').watch;

gulp.task('nodemon', [], function () {
    nodemon({
        exec: 'babel-node server.js'
        , ext: 'html js'
        , ignore: ['ignored.js']
        , tasks: ['browserify']
    })
        .on('restart', function () {
            console.log('restarted!')
        });
});