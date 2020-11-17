const srcDir = 'src/';
const cssPath = 'src/scss/styles.scss';
const jsPath = 'src/js/**/*.js';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const { src, series, parallel, dest, watch } = require('gulp');

const postcssPlugins = [ 
  autoprefixer(),
  cssnano()
];

function copyHtml() {
  return src(srcDir + '*.html')
  .pipe(gulp.dest('public'));
}

function imgTask() {
  return src(srcDir + 'assets/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/images'));
}
function buildStyles() {
  return src(cssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(postcssPlugins))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('public/css'));
}

function buildScript() {
  return(src(jsPath))
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('public/js'));
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(buildStyles, buildScript));
}
exports.buildScript = buildScript; //$gup buildScript
exports.sass = buildStyles;  // $gulp sass
exports.imgTask = imgTask;   //$gulp imgTask
exports.copyHtml = copyHtml; // $gulp copyHtml

exports.default = series(
  parallel(copyHtml, imgTask, buildScript, buildStyles),
  watchTask // $gulp
);