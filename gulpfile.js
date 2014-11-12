var gulp = require('gulp'),
    jshint = require('gulp-jshint');

var jsFiles = [
  './src/*.js'
];

// Linting
gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
