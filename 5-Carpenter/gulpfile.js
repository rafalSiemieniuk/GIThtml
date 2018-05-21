var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
const babel = require('gulp-babel');

gulp.task('less', () =>
    gulp.src('src/less/main.less')
        .pipe(watch())
        .pipe(less())
        .pipe(gulp.dest('dist/css/'))
);

gulp.task('babel', () =>
    gulp.src('src/js/app.js')
        .pipe(watch())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('default', ['less','babel']);


