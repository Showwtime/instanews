var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
    browserSync = require('browser-sync')
    eslint = require('gulp-eslint')
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano");
    babel = require("gulp-babel");

gulp.task("sass", function() {
    return gulp
    .src("./sass/style.scss")
    .pipe(sass())
    .pipe(
    autoprefixer({
        browsers: ["last 2 versions"]
    })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});


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
    .pipe(babel({
        presets: ['env']
    }))
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
    
    gulp.watch(['./build/js/*.min.js', './build/css/*.css', 'index.html']).on('change', browserSync.reload);
    done();
});

gulp.task('watch', function(done){ //watches file for changes, and automatically saves
    gulp.watch('./js/*.js', gulp.series('scripts'))
    gulp.watch('sass/*.scss',  gulp.series('sass')) //watches
    done(); //when finished running, tells command its done
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));






