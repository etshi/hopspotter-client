var gulp = require('gulp');
var del = require('del');

var config = require('../config').clean;

gulp.task('clean:html', function () {
  return del(config.html);
});
gulp.task('clean:scripts', function () {
  return del(config.scripts);
});
gulp.task('clean:locales', function () {
  return del(config.locales);
});
