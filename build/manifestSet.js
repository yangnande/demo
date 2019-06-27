// 设置html的manifest
const fs = require("fs")
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const version = require('../package.json').version
const chalk = require('chalk')
// 将需要添加manifest的html信息写在里边
exports.setFileName = [
  {
    folder: 'navigation',
    name: 'navigation'
  },
  {
    folder: 'find',
    name: 'find'
  },
  {
    folder: 'medical-sort',
    name: 'medical-sort'
  }
]

exports.canSet = function () {
  let arr = []
  exports.setFileName.map(item => {
    if (item.folder === utils.assetsPath()) {
      arr.push(item)
    }
  })
  if (arr.length > 0) {
    return arr
  } else {
    return false
  }
}

exports.set = function () {
  const fileName = exports.canSet()
  fileName.map(item => {
    // 获取要添加manifest的html的路径
    const envPath = path.resolve(__dirname, `${config.build.assetsRoot}/${item.folder}/${item.name}.html`)
    const exists = fs.existsSync(envPath)
    if (exists) {
      getHTML(envPath, item)
    } else {
      console.log(chalk.white.bgRed(`${envPath}   is not find, Unable to write\n`))
    }
  })
}

// 获取html 并拼接manifest
function getHTML (envPath, page) {
  // 获取html文本
  let fileContent = fs.readFileSync(envPath, "utf-8")

  // 改变html头部，增加manifest引用
  fileContent = fileContent.replace(/<html lang="zh-CN">/, `<html lang="zh-CN" manifest="manifest/${page.name}.manifest">`)
  fs.writeFileSync(envPath, fileContent)
  // 拼接 manifest 文件文本
  let text = ''
  text += `CACHE MANIFEST\n`
  text += `#VERSION v${ version }\n`
  text += `#DATE ${new Date()}\n\n`
  // 获取里边的资源文件
  const box = fileContent.match(/(src=|href=)[\'\"]?([^\'\"]*)[\'\"]?/g)
  // 将资源文件遍历出来 逐条加入到 文本里边
  box.map(item => {
    if (item.indexOf('vconsole') < 0) {
      var str = item.match(/\"[\'\"]?([^\'\"]*)[\'\"]?/g)
      str = str[0].replace(/\"/g, '')
      str = str.replace('../public', '../../public')
      str = str.replace(`../${page.folder}`, '..')
      text += str + '\n'
    }
  })
  text += `\n\nNETWORK:\n*\n\nFALLBACK:\n\n`
  //  获取写入目录路径
  const wfile = path.resolve(__dirname, `${config.build.assetsRoot}/${page.folder}/manifest/`)
  // 检查写入目录是否存在
  const exists = fs.existsSync(wfile)
  if (exists) {
    writeManifest(path.resolve(wfile, `${page.name}.manifest`), text)
  } else {
    fs.mkdirSync(wfile)
    writeManifest(path.resolve(wfile, `${page.name}.manifest`), text)
  }
}

// 写入文本
function writeManifest (path, text) {
  fs.writeFileSync(path, text)
  console.log(chalk.black.bgGreen(`${path}   OK\n`))
}
