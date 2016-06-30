/* eslint-disable */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

var babelify = require('babelify');
var browserify = require('browserify');
var envify = require('envify/custom');
var minifyify = require('minifyify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var handleErrors = require('../util/handleErrors');
var config = require('../config').browserify;

var path = require('path');

var b = browserify({
  cache: {},
  debug: true,
  entries: config.entries,
  extensions: ['.jsx'],
  packageCache: {},
  transform: ['babelify']
}).ignore('buffertools');
var bundle = function () {
  var bundleStart = Date.now();
  plugins.util.log('Start bundle!');
  return b
    .transform({global: true}, envify({
      NODE_ENV: config.env
    }))
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.destination))
    .pipe(reload({stream: true}))
    .pipe(plugins.notify({
      message: '<%= file.relative %> successfuly bundled in <%= options.time %> ms',
      templateOptions: { time: Date.now() - bundleStart }
    }));
};
if (config.watch) {
  b = watchify(b);
  b.on('update', bundle);
  b.on('log', plugins.util.log);
} else {
  b.plugin('minifyify', {
    compressPath: function (p) {
      return (p.indexOf('src/scripts') !== -1) ? path.relative('./src/scripts', p) : p;
    },
    map: (config.debug) ? config.sourcemapFilename : config.sentryDummySourcemapUrl,
    output: config.outputSourcemap
  });
}

gulp.task('browserify', ['clean:scripts', 'config'], function() {
  return bundle();
});
