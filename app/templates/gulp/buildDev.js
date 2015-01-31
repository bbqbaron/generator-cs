var gulp = require('gulp'),
    config = require('./config/jsSettings.json')
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

require('./ls');

gulp.task('build-dev', ['ls'], function() {
    return gulp.src(config.sourceFile)
        .pipe(browserify())
        .pipe(gulp.dest(config.destinationDirectory));
});
