var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    transform = require('vinyl-transform');

// TODO lessify

// TODO this should be optional, since eg Django doesn't want you doing it this way
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

// TODO get rid of global transforms
// TODO uglifyify
var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
});

// TODO parameterized output
gulp.task('build-dev', ['html'], function() {
    return gulp.src('src/app/main.js')
        .pipe(browserified)
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['html'], function() {
    return return gulp.src('src/app/main.js')
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
