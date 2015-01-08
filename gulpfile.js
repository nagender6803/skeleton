/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    path = require('path');
 
// Styles
gulp.task('styles', function () {
  gulp.src('app/src/styles/bootstrap.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/dist/styles/'))
    .pipe(minifycss({keepBreaks:true}))
    .pipe(gulp.dest('app/dist/styles/minify'));
});

// CSS Styles
gulp.task('cssstyles', function () {
  gulp.src('app/src/styles/*.css')
    .pipe(gulp.dest('app/dist/styles/'))
    .pipe(minifycss({keepBreaks:true}))
    .pipe(gulp.dest('app/dist/styles/minify'));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/src/scripts/js/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('app/dist/scripts/minify'));
});

// Libs
gulp.task('libs', function() {
  return gulp.src('app/src/scripts/lib/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('app/dist/scripts/lib'));
});

// Helpers
gulp.task('helpers', function() {
  return gulp.src('app/src/scripts/helpers/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('app/dist/scripts/helpers'));
});

// Templates
gulp.task('templates', function() {
  return gulp.src('app/src/templates/*.html')
    .pipe(gulp.dest('app/dist/templates'));
});
  
// Clean
gulp.task('clean', function(cb) {
    del(['app/dist/assets/css', 'app/dist/assets/js', 'app/dist/assets/img'], cb)
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles','libs', 'scripts', 'helpers', 'templates', 'cssstyles');
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch .scss files
  gulp.watch('app/src/styles/**/*.scss', ['styles']);
 
  // Watch .js files
  gulp.watch('app/src/scripts/js/*.js', ['scripts']);
  gulp.watch('app/src/scripts/js/*.js', ['libs']);
  gulp.watch('app/src/scripts/js/*.js', ['helpers']);
 
  // Watch image files
  gulp.watch('app/src/images/**/*', ['images']);
 
  // Create LiveReload server
  livereload.listen();
 
  // Watch any files in dist/, reload on change
  gulp.watch(['app/dist/**']).on('change', livereload.changed);
 
});