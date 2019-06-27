'use strict'
const path = require('path')
const chalk = require('chalk')
const fs = require("fs")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 用于做相应的merge处理
const merge = require('webpack-merge')
// 雪碧图
const SpritesmithPlugin = require('webpack-spritesmith')

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  const pageName = exports.buildFileName()
  let fileMain = []
  pageName.map(item => {
    const arr = glob.sync(PAGE_PATH + `/${item}/*/main.js`)
    fileMain = fileMain.concat(arr)
  })
  let map = {}
  fileMain.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('/', filePath.lastIndexOf('/') - 1) + 1, filePath.lastIndexOf('/'))
    map[filename] = filePath
  })
  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  const pageName = exports.buildFileName()
  let fileHtml = []
  pageName.map(item => {
    fileHtml = fileHtml.concat(glob.sync(PAGE_PATH + `/${item}/*/index.html`))
  })
  let arr = []
  fileHtml.forEach((filePath) => {
    let folder = filePath.substring(0, filePath.lastIndexOf('/')).match(/src\/pages\/(\S*)\//)[1]
    let filename = filePath.substring(filePath.lastIndexOf('/', filePath.lastIndexOf('/') - 1) + 1, filePath.lastIndexOf('/'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: folder + '/' + filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.buildFileName = function () {
  let fileName = ['demo-file']
  if (process.env.NODE_ENV === 'production') {
    let str = JSON.parse(process.env.npm_config_argv).cooked[2].split('/')[1]
    if (str) {
      fileName = str.split('!')
    } else {
      console.log(chalk.red('error: No designation build folder.\n'))
      process.exit()
    }
  } else {
    let str = JSON.parse(process.env.npm_config_argv).cooked[2]
    if (str) {
      str = str.replace(/\--/i, '')
      fileName = str.split('!')
    }
  }
  return fileName
}

exports.getHomeHost = function (fileName) {
  const arr = glob.sync(PAGE_PATH + `/${fileName}/*/index.html`)
  const HH = arr[0].substring(arr[0].indexOf(fileName), arr[0].lastIndexOf('/'))
  return HH
}

exports.assetsPath = function () {
  return path.posix.join(exports.buildFileName()[0])
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      minimize: true
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 雪碧图插件
exports.spritePlugin = () => {
  let mainPath = ''
  if (process.env.NODE_ENV === 'production') {
    let ev = JSON.parse(process.env.npm_config_argv).cooked[2].split('/')[0]
    switch (ev) {
      case 'p':
        mainPath = '/' + packageConfig.name
        break
      case 't':
        mainPath = '/' + packageConfig.name + '-test'
        break
      case 'x':
        mainPath = '/' + packageConfig.name + '-xa'
        break
      default:
        console.log(chalk.red('error: no "' + ev + '" env .\n'))
        process.exit()
        break
    }
  }

  const pageArr = glob.sync(PAGE_PATH + `/*/*/*/sprite`)
  let funarr = []
  pageArr.map(pageurl=> {
    // 检查写入目录是否存在
    // const pageName = pageurl.split('/')[5]

    const pathArr = pageurl.split('/')
    const pageName = pathArr[pathArr.length - 3]

    const exists = fs.existsSync(pageurl)
    if (exists) {
      let item = new SpritesmithPlugin({
        src: {
          cwd: pageurl,
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, `../public/sprite/${pageName}-sprite.png`),
          css: [
            [
              path.resolve(pageurl, `../${pageName}-sprite.scss`),
              {
                format: `handlebars_based_template`
              }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: `${mainPath}/public/sprite/${pageName}-sprite.png`
        },
        customTemplates: {
          handlebars_based_template: path.resolve(__dirname, `../scss.template.handlebars`)
        },
        spritesmithOptions: {
          padding: 6
        }
      })
      funarr.push(item)
    }
  })
  return funarr
}
