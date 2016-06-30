var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

var config = require('../config').assets;

gulp.task('html', ['clean:html'], function() {
  // HTML
  return gulp.src(config.html.src)
    .pipe(plugins.template(config.data))
    .pipe(gulp.dest(config.html.dest))
    .pipe(reload({stream: true}));
});
