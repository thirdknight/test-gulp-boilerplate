const srcDir = 'src/';
const cssPath = 'src/assets/scss/styles.scss';
const jsPath = 'src/assets/js/**/*.js';

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
  .pipe(gulp.dest('dist'));
}

function imgTask() {
  return src(srcDir + 'images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
}

// function buildStyles() {
//   return src(srcDir + 'assets/scss/styles.scss')
//   .pipe(sass().on('error',sass.logError))
//   .pipe(gulp.dest('dist/css'));
// }

function buildStyles() {
  return src(cssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(postcssPlugins))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist/assets/css'));
}

function buildScript() {
  return(src(jsPath))
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist/assets/js'));
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
  watchTask
);