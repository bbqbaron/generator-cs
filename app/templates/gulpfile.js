var gulp = require('gulp'),
    livescript = require('gulp-livescript'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

gulp.task('ls', function() {
    gulp.src('src/**/*.ls')
        .pipe(livescript())
        .pipe(gulp.dest('src'));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-dev', ['ls', 'html'], function() {
    return gulp.src('src/app/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['ls', 'html'], function() {
    return gulp.src('src/app/main.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// TODO ls compilation output cleanup
// TODO watcher(s)
