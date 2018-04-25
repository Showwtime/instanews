var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
    browserSync = require('browser-sync')
    eslint = require('gulp-eslint');

gulp.task('lint', function(){
    return gulp
    .src(['./js/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()) 
});

gulp.task('scripts', gulp.series('lint', function(){
    return gulp
    .src('./js/*.js') //Take this file
    .pipe(uglify()) //input into here, and uglify
    .pipe(rename({ extname: '.min.js'})) // take uglified file and rename .min.js
    .pipe(gulp.dest('./build/js')); //put uglified and renamed file and put in 'build' folder
}));

gulp.task('browser-sync', function(done){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    gulp.watch(['build/js/*.min.js', 'style.css', 'index.html']).on('change', browserSync.reload);
    done();
});

gulp.task('watch', function(done){ //watches file for changes, and automatically saves
    gulp.watch('./js/*.js', gulp.series('scripts')) //watches
    done(); //when finished running, tells command its done
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));






