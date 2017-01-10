var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});


gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    gulp.src('./src/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('default', ['templates', 'sass'], function () {
    livereload.listen();
    gulp.watch('./src/jade/**/*.jade', ['templates']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});