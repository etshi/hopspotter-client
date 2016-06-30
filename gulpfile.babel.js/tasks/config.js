var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

var config = require('../config').config;

gulp.task('config', function() {
  // copy the right config file into scripts folder
  return gulp.src(config.src)
    .pipe(plugins.template({config: JSON.stringify(config.data, null, '\t')}))
    .pipe(plugins.rename('config.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
