// config
const localUrl = 'localhost/test-gulp-boilerplate/public';

const srcDir = 'src/';
const cssPath = 'src/scss/styles.scss';
const jsPath = 'src/js/**/*.js';

const { src, series, parallel, dest, watch } = require('gulp');
// dependecies
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

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
// Compile CSS from Sass
function buildStyles() {
  return src(cssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(postcssPlugins))
  .pipe(sourcemaps.write('../../src/sourcemaps'))
  .pipe(dest('public/css'))
  .pipe(browsersync.reload({ stream: true }));
}
//Build Scripts
function buildScript() {
  return(src(jsPath))
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(babel({
    presets: [
      ['@babel/env', {
        modules: false
      }]
    ]
  }))
  .pipe(concat('script.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('../sourcemaps'))
  .pipe(dest('public/js'))
  .pipe(browsersync.reload({ stream: true }));
}

function browserSync(done) {
  browsersync.init({
    proxy: localUrl,
  });
  done();
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(buildStyles, buildScript));
}

// Exports commands
exports.buildScript = buildScript; //$gup buildScript
exports.sass = buildStyles;  // $gulp sass
exports.imgTask = imgTask;   //$gulp imgTask
exports.copyHtml = copyHtml; // $gulp copyHtml
exports.browserSync = browserSync;
exports.default = series(
  parallel(copyHtml, imgTask, buildScript, buildStyles, browserSync),
  watchTask // $gulp
);