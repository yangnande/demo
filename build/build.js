'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')
const manifest = require('./manifestSet')


webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  // 设置manifest
  if (manifest.canSet()) {
    console.log(chalk.black.bgWhite('  writing manifest  \n'))
    manifest.set()
    console.log(chalk.black.bgWhite('  manifest over  \n'))
  }
})
