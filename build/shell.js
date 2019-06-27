const shell = require('shelljs')
const chalk = require('chalk')

// remove build folder
shell.rm('-rf', '【build】')

// 校验 build 环境，并修改 env.js 环境
const fs = require("fs")
const path = require("path")
const envPath = path.resolve(__dirname, '../src/utils/env.js')
const fileContent = fs.readFileSync(envPath, "utf-8")
const configArr = JSON.parse(process.env.npm_config_argv)

// 没有环境参数
if (!configArr.remain[0]) {
  console.log()
  console.log(chalk.red('  没有指定打包环境  '))
  console.log(chalk.gray('  # npm run build p    生产环境'))
  console.log(chalk.gray('  # npm run build t    灰度环境'))
  console.log(chalk.gray('  # npm run build x    西安环境\n'))
  return
}

const serverEnv = configArr.remain[0].split('/')[0]
if (serverEnv === 'p' || serverEnv === 't' || serverEnv === 'x') {
  const text = fileContent.replace(/(const env = 'p'|const env = 't'|const env = 'x')/, `const env = '${serverEnv}'`)
  fs.writeFileSync(envPath, text)
} else {
  console.log()
  console.log(chalk.red('  打包环境错误  '))
  console.log(chalk.gray('  # npm run build p    生产环境'))
  console.log(chalk.gray('  # npm run build t    灰度环境'))
  console.log(chalk.gray('  # npm run build x    西安环境\n'))
  return
}

// get env
const ev = JSON.parse(process.env.npm_config_argv).cooked[2]
if (!ev) shell.exit()

// get folder 如果没有指定 则打包除 demo-file 和 uiComponent 之外的所有文件
const arr = ev.split('/')
if (!arr[1]) {
  const PAGE_PATH = path.resolve(__dirname, '../src/pages')
  arr[1] = fs.readdirSync(PAGE_PATH).join('!')
  arr[1] = arr[1].replace(/(demo-file!|demo-file|uiComponent!|uiComponent)/g, '')
  if (arr[1][arr[1].length - 1] === '!') {
    arr[1] = arr[1].substring(0, arr[1].length - 1)
  }
  if (!arr[1]) {
    console.log(chalk.red('  此项目中没有可打包的目录 \n\n'))
    shell.exit()
  }
}

// build
const folder = arr[1].split('!')
folder.map((item, index) => {
  console.log(chalk.blue(`\n本次打包共${folder.length}个目录，正在打包第${index + 1}个：${item}，请稍等。。。。。 \n`))
  shell.exec(`npm run build-one ${arr[0]}/${item}`, {silent: false})
})
console.log(chalk.black.bgCyan('  所有打包完成  \n\n'))
console.log(chalk.blue('  输入 gulp 命令上传  \n'))
