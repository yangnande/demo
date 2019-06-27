const gulp = require('gulp')
const zip = require('gulp-zip')
const dateFormat = require('dateformat')
const sftp = require('gulp-sftp')
const runSequence = require('run-sequence')

let now = new Date()

let folderName = require('./package.json').name
let path = require('path')
let fs = require('fs');
let files = fs.readdirSync(path.resolve(__dirname, './【build】'))
files.forEach(function (file) {
  if (file.indexOf(folderName) > -1) {
    folderName = file
  }
})

// generate zip for production
gulp.task('zip', function () {
  if (folderName.indexOf('xa') === -1) {
    return gulp.src('【build】/' + folderName + '/**/*', {
      base: '【build】'
    })
      .pipe(zip(dateFormat(now, 'yyyymmddHHMM') + folderName + '.zip'))
      .pipe(gulp.dest('【build】'))
  }
})

// up the production-zip to 192.168.10.101
gulp.task('up', function () {
  if (folderName.indexOf('xa') === -1) {
    // return gulp.src('【build】/*' + folderName + '.zip', {
    //   base: '【build】'
    // })
    return gulp.src('【build】/**', {
      base: '【build】'
    })
      .pipe(sftp({
        host: '192.168.10.101',
        user: 'root',
        pass: 'lead@cn.#$',
        // remotePath: '/opt/nginx/html/h5/',
        remotePath: '/opt/nginx/html/',
        timeout: 100000
      }))
  }
})

// default task
gulp.task('default', function () {
  runSequence('up')
})
