var gulp = require('gulp'),
    livescript = require('gulp-livescript'),
    config = require('./config/jsSettings.json')
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

var config = { "sourceFile": "./src/main.js",
    "destinationDirectory": "./dist" };

gulp.task('ls', function() {
    return gulp.src('src/**/*.ls')
        .pipe(livescript())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-dev', ['ls', 'html'], function() {
    return gulp.src(config.sourceFile)
        .pipe(browserify())
        .pipe(gulp.dest(config.destinationDirectory));
});

gulp.task('build', ['ls', 'html'], function() {
    return gulp.src(config.sourceFile)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(config.destinationDirectory));
});
