const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const gulpjsminify = require('gulp-minify');
const postcss = require('gulp-postcss');
const gulprename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');

function style () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/assets/css'));
}

function styleMin () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulprename(function(path) {
        path.basename += ".min"
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/assets/css/'));
}

function jsMinify () {
    return gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(gulpjsminify())
    .pipe(gulp.dest('./dist/assets/js'));
}

function img () {
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'));
}

function watch () {
    gulp.watch('./src/scss/**/*.scss' , style);
    gulp.watch('./src/scss/**/*.scss' , styleMin);
    gulp.watch('./src/img/*' , img);
    gulp.watch('./src/js/**/*.js' , jsMinify);
}

exports.styleMin = style;
exports.styleMin = styleMin;
exports.jsMinify = jsMinify;
exports.img = img;
exports.watch = watch;