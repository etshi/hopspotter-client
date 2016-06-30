var gulp = require('gulp');
var reload = require('browser-sync').reload;

var config = require('../config').locales;

gulp.task('locales', ['clean:locales'], function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
