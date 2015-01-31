var gulp = require('gulp'),
    livescript = require('gulp-livescript');

gulp.task('ls', function() {
    return gulp.src('src/**/*.ls')
        .pipe(livescript())
        .pipe(gulp.dest('dist'));
});
