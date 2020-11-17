const srcDir = 'src/';

const gulp = require('gulp');
 const imagemin = require('gulp-imagemin');
 const sass = require('gulp-sass');
 const { src, series, parallel, dest, watch } = require('gulp');

 function copyHtml() {
   return src(srcDir + '*.html').pipe(gulp.dest('dist'));
 }

 function imgTask() {
   return src(srcDir + 'images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
 }

 function buildStyles() {
   return src(srcDir + 'assets/scss/styles.scss').pipe(sass().on('error',sass.logError)).pipe(gulp.dest('dist/css'))
 }
 exports.imgTask = imgTask;   //$gulp imgTask
 exports.copyHtml = copyHtml; // $gulp copyHtml
 exports.sass = buildStyles;  // $gulp sass
 exports.default = parallel(copyHtml, imgTask);