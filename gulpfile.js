var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    phantom = require('gulp-mocha-phantomjs'),
    seq = require('run-sequence');

var jsFiles = [
  './src/*.js'
];

// Linting
gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Tests
gulp.task('node-test', function() {
  return gulp.src('./test/endpoint.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('browser-test', function() {
  return gulp.src('./test/browser/unit.html')
    .pipe(phantom({reporter: 'spec'}));
});

// Macro-task
gulp.task('test', function() {
  return seq('node-test', 'browser-test');
});

gulp.task('default', function() {
  return seq('lint', 'test');
});
