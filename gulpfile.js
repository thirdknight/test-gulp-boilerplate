// config
const localUrl = 'localhost/test-gulp-boilerplate/build';
const srcDir = './src/';
const buildDir = './build/';

const scss_sources = [
  srcDir + 'scss/*.scss', 
  srcDir + 'scss/**/*.scss'
];

let watched_js_sources = [];
let js_sources = [];

watched_js_sources = [
  srcDir + 'js/**/*.js',
  srcDir + 'js/**/**/*.js',
  
  srcDir + 'js/*.js'
];
js_sources = [
  // srcDir + 'js/scripts.js'
  srcDir + 'js/**/*.js',
];

// dependencies
const { src, dest, watch, series, parallel } = require('gulp');
const gulp = require('gulp');
const browsersync   = require('browser-sync').create();
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const minify        = require('gulp-minify');
// const rollup        = require('gulp-better-rollup'); // see https://nshki.com/es6-in-gulp-projects/ 
// const babel         = require('rollup-plugin-babel'); // to import modules
const resolve       = require('@rollup/plugin-node-resolve');
const replace       = require('@rollup/plugin-replace');
const commonjs      = require('@rollup/plugin-commonjs');
const json          = require('@rollup/plugin-json');
// const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');
const eslint        = require('gulp-eslint');
const beeper        = require('beeper');
const imagemin      = require('gulp-imagemin');
const concat        = require('gulp-concat');
const terser        = require('gulp-terser');
const babel         = require('gulp-babel');
const webpack       = require('webpack-stream');



const postcssPlugins = [ 
  autoprefixer(),
  cssnano()
];

// Copy html
function copyHtml() {
  return src(srcDir + '*.html')
  .pipe(gulp.dest(buildDir));
}

// Compress Imgen
function copyImages() {
  return src(srcDir + 'assets/images/**/*.{jpg,jpeg,png,gif,svg}')
  .pipe(imagemin())
  .pipe(gulp.dest(buildDir + 'assets/images'))
}

function copyFonts() {
  return src(srcDir + 'assets/fonts/**/*.{svg,eot,ttf,woff,woff2}')
  .pipe(gulp.dest(buildDir + 'assets/fonts'))
}
// Compile CSS from Sass.
function buildStyles() {
  return src(srcDir + 'scss/styles.scss')
    // .pipe(plumbError())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('../../src/sourcemaps'))
    .pipe(dest(buildDir + 'css/'))
    .pipe(browsersync.reload({ stream: true }));
}

function buildScripts() {
  return src(js_sources)
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(webpack({
    mode: 'development',
    devtool: 'inline-source-map'
  }))
  .pipe(sourcemaps.init())
  .pipe(concat('scripts.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('../../src/sourcemaps'))
  .pipe(dest('build/js'))
  .pipe(browsersync.reload({ stream: true }));
}

// Watch changes separately
function watchCSS() {
  watch(
    scss_sources,
    { events: 'all', ignoreInitial: false },
    buildStyles
  );
}

function watchJS() {
  watch(
    watched_js_sources,
    { events: 'all', ignoreInitial: false },
    buildScripts
  );
}

// Init BrowserSync.
function browserSync(done) {
  browsersync.init({
    proxy: localUrl, // Change this value to match your local URL.
    socket: {
      domain: 'localhost:3000'
    }
  });
  done();
}

// function plumbError() {
//   return plumber({
//     errorHandler: function(err) {
//       notify.onError({
//         templateOptions: {
//           date: new Date()
//         },
//         title: "Gulp error in " + err.plugin,
//         message:  err.formatted
//       })(err);
//       beeper();
//       this.emit('end');
//     }
//   })
// }

exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
exports.sass = buildStyles; // $ gulp sass
exports.buildScripts = buildScripts; //gulp script
exports.watch = parallel(watchCSS, watchJS, browserSync); // $gulp watch

exports.default = parallel(copyHtml, copyImages, copyFonts,watchCSS, watchJS, browserSync); // $gulp