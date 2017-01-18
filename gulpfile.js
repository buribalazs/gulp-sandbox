var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});


gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    gulp.src('src/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('images', function () {
    var YOUR_LOCALS = {};

    gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img/'))
        .pipe(livereload());
});

gulp.task('default', ['templates', 'sass', 'images'], function () {
    livereload.listen();
    gulp.watch('jade/**/*.jade', {cwd: './src'}, ['templates']);
    gulp.watch('sass/**/*.scss', {cwd: './src'}, ['sass']);
    gulp.watch('img/**/*.*', {cwd: './src'}, ['images']);
});