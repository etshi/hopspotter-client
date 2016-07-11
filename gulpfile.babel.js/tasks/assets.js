var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

var config = require('../config').assets.svg;

gulp.task('assets', function() {
  // copy assets like third party scripts, favicons, fonts, etc.
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
})
