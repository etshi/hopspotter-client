var gulp = require('gulp');
var browserSync = require('browser-sync');

var config = require('../config').serve

gulp.task('serve', function () {
  browserSync(config.browserSync);

  config.watch.forEach(function (watch) {
    gulp.watch(watch.src, [watch.task]);
  });
});
