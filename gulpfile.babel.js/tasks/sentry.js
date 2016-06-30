var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var merge = require('merge-stream');

var config = require('../config').sentry;

var sentryRelease = require('gulp-sentry-release')('./package.json', {
  DOMAIN: config.sentrySourcemapsDummyDomain,
  API_URL: config.apiUrl,
  API_KEY: config.apiKey,
  debug: true
});

gulp.task('sentry:release', ['build'], function() {
  var sourcemap = gulp.src(config.sourcemap, { base: config.dest})
    .pipe(sentryRelease.release(config.revision));
  var sources = gulp.src(config.sources, { base: config.src})
    .pipe(sentryRelease.release(config.revision));
  return merge(sourcemap, sources);
});
gulp.task('sentry:delete', ['build'], function() {
  return gulp.src([config.sourcemap, config.sources])
    .pipe(sentryRelease.deleteVersion(config.revision));
});
