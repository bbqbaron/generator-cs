var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    transform = require('vinyl-transform');

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-dev', ['ls', 'html'], function() {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src('src/app/main.js')
        .pipe(browserified)
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['ls', 'html'], function() {
    return return gulp.src('src/app/main.js')
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
