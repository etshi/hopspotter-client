'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var requireDir = require('require-dir');

if (plugins.util.env.dev) {
  plugins.util.log(plugins.util.colors.yellow('Development mode...'));
}

requireDir('./tasks', { recurse: true });
