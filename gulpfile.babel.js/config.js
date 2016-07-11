/*eslint-env node, mocha */
var assign = require('deep-assign')
var minimist = require('minimist')
var git = require('git-rev-sync')
var plugins = require('gulp-load-plugins')()

var knownOptions = {
  string: ['env', 'dest', 'issuer', 'revision'],
  default: {
    env: process.env.NODE_ENV || 'production',
    revision: process.env.GIT_COMMIT || git.long(),
    revShort: process.env.GIT_COMMIT_SHORT || git.short()
  }
}
var options = minimist(process.argv.slice(2), knownOptions)
// we overwrite the env argument for the `dev` gulp task
if (process.argv.indexOf('dev') !== -1) options.env = 'development'

var DEST = options.dest || './build'
var SRC = './src'
var LIB = './lib'

// debug mode
var debug = (options.env !== 'production')

// generate configs: combine base + environment configs
var pkg = require('../package.json')
var baseConfig = require('../src/config/config.json')
try {
  var envConfig = require('../src/config/' + options.env + '.json')
} catch (e) {
  plugins.util.log(
    plugins.util.colors.red('Missing engvironment configuration file: ' + e.message)
  )
}
assign(
  baseConfig,
  {
    debug: (options.env === 'development'),
    env: options.env,
    issuer: (options.issuer) ? '-' + options.issuer : '',
    release: pkg.version + '-rev' + options.revision,
    revision: options.revision,
    revShort: options.revShort,
    version: pkg.version
  },
  envConfig
)

var gulpCommonConfig = {
  sentrySourcemapsDummyDomain: 'http://optiopay.sourcemaps',
  sourcemapFilename: 'app.map'
}

var url = require('url');
var proxy = require('proxy-middleware');
var proxyOptions = url.parse('https://office-test.optiopay.com/v1');
    proxyOptions.route = '/v1';

module.exports = {
  assets: {
    data: baseConfig,
    html: {
      dest: DEST,
      src: SRC + '/*.html'
    },
    lib: {
      src: LIB + '/*.js',
      dest: DEST + '/lib'
    },
    svg: {
      src: SRC +  '/assets/svgs/*.svg',
      dest: DEST + '/assets/svgs'
    }
  },
  browserify: {
    debug: debug,
    destination: DEST + '/scripts',
    entries: SRC + '/scripts/app.js',
    env: baseConfig.env,
    outputName: 'app.js',
    outputSourcemap: DEST + '/scripts/' + gulpCommonConfig.sourcemapFilename,
    sentryDummySourcemapUrl: gulpCommonConfig.sentrySourcemapsDummyDomain + '/scripts/' + gulpCommonConfig.sourcemapFilename,
    sourcemapFilename: gulpCommonConfig.sourcemapFilename,
    watch: (options.env === 'development')
  },
  clean: {
    html: [DEST + '/**/*.html'],
    scripts: [DEST + '/**/*.js'],
    locales: [DEST + '/locales/*.json']
  },
  config: {
    data: baseConfig,
    src: SRC +  '/config/config.tmpl.js',
    dest: SRC + '/scripts'
  },
  fixtures: {
    src: './fixtures/entities/*.json',
    dest: `${DEST}/fixtures`
  },
  locales: {
    src: SRC + '/locales/*.json',
    dest: DEST + '/locales'
  },
  sentry: {
    apiUrl: 'sentry api url',
    apiKey: 'sentry api key',
    revision: baseConfig.revision,
    sentrySourcemapsDummyDomain: gulpCommonConfig.sentrySourcemapsDummyDomain,
    sourcemapFilename: 'app.map',
    sourcemap: DEST + '/scripts/' + gulpCommonConfig.sourcemapFilename,
    sources: SRC + '/scripts/**/*.js',
    version: baseConfig.version,
    src: SRC,
    dest: DEST
  },
  serve: {
    browserSync: {
      server: { baseDir: DEST, middleware: [proxy(proxyOptions)] },
      notify: false
    },
    watch: [
      { src: SRC + '/*.html', task: 'html' },
      { src: SRC + '/locales/*.json', task: 'locales' }
    ]
  }
}
