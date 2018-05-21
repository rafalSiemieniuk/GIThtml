var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create(); 

gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build/'))
});

gulp.task('html-watch', function(){
    gulp.watch('src/index.html', ['html']);
})

gulp.task('sass', function(){
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
});

gulp.task('sass-watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
})

gulp.task('es6', function(){
    return gulp.src('src/js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function(e) {
          console.error(e);
          this.emit('end');
        })
        .pipe(gulp.dest('build/js'))
});

gulp.task('es6-watch', function(){
    gulp.watch('src/js/**/*.js', ['es6']);
})

gulp.task('serve', function() {
    browserSync.init({
        server: './build/',
    });

    gulp.start('sass');
    gulp.start('es6');
    gulp.start('html');

    gulp.start('sass-watch');
    gulp.start('es6-watch');
    gulp.start('html-watch');

    gulp.watch('build/**/*.html').on('change', browserSync.reload);
    gulp.watch('build/**/*.css').on('change', browserSync.reload);
    gulp.watch('build/**/*.js').on('change', browserSync.reload);
});


gulp.task('default', ['serve']);