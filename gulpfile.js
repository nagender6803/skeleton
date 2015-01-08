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
  gulp.src('src/styles/bootstrap.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(minifycss({keepBreaks:true}))
    .pipe(gulp.dest('dist/styles/minify'));
});

// CSS Styles
gulp.task('cssstyles', function () {
  gulp.src('src/styles/*.css')
    .pipe(gulp.dest('dist/styles/'))
    .pipe(minifycss({keepBreaks:true}))
    .pipe(gulp.dest('dist/styles/minify'));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/js/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('dist/scripts/minify'));
});

// Libs
gulp.task('libs', function() {
  return gulp.src('src/scripts/lib/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('dist/scripts/lib'));
});

// Helpers
gulp.task('helpers', function() {
  return gulp.src('src/scripts/helpers/*.js')
    .pipe(uglify({mangle : false}))
    .pipe(gulp.dest('dist/scripts/helpers'));
});

// Templates
gulp.task('templates', function() {
  return gulp.src('src/templates/*.html')
    .pipe(gulp.dest('dist/templates'));
});
  
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles','libs', 'scripts', 'helpers', 'templates', 'cssstyles');
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);
 
  // Watch .js files
  gulp.watch('src/scripts/js/*.js', ['scripts']);
  gulp.watch('src/scripts/js/*.js', ['libs']);
  gulp.watch('src/scripts/js/*.js', ['helpers']);
 
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
 
  // Create LiveReload server
  livereload.listen();
 
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
 
});