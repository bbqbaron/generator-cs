var gulp = require('gulp'),
    config = require('./config/jsSettings.json'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

require('./ls');

gulp.task('ls', function() {
    return gulp.src('src/**/*.ls')
        .pipe(livescript())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['ls'], function() {
    return gulp.src(config.sourceFile)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(config.destinationDirectory));
});
