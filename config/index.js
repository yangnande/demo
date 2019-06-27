'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const chalk = require('chalk')
const path = require('path')
const port = "8787"
let EventName = require('../package').name
if (process.env.NODE_ENV === 'production') {
  let ev = JSON.parse(process.env.npm_config_argv).cooked[2]
  if (!ev) {console.log(chalk.red('error: No designation build env and folder.\n'));process.exit()}
  ev = ev.split('/')[0]
  if (ev == 'undefind') {console.log(chalk.red('error: No designation build env and folder.\n'));process.exit()}
  switch (ev) {
    case 'p':
      break
    case 't':
      EventName += '-test'
      break
    case 'x':
      EventName += '-xa'
      break
    default:
      console.log(chalk.red('error: no "' + ev + '" env .\n'))
      process.exit()
      break
  }
}

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {//代理  webpack-dev-server提供
      '/api':{
        target:'http://192.168.5.22:8787',//请求转发到本地服务器
        pathRewrite: {//替换路径
          '^/api':'/public/json'
        }
      }
    },

    // Various Dev Server settings
    host: require('my-local-ip')(), // can be overwritten by process.env.HOST
    port: port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, `../【build】/${EventName}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
