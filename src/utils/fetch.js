import 'babel-polyfill'
import 'whatwg-fetch'
import CryptoJS from 'crypto-js'
import { leadeon_Loading, leadeon_EndLoading } from './leadeon-ui'

/**
 * byteArray to string
 * @param {Array} arr byteArray
 */
function byteToString (arr) {
  if (typeof arr === 'string') {
    return arr
  }
  let str = ''
  let _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2)
    let v = one.match(/^1+?(?=0)/)
    if (v && one.length === 8) {
      let bytesLength = v[0].length
      let store = _arr[i].toString(2).slice(7 - bytesLength)
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}
/**
 * byteArray 密文
 */
// 正式
var ivP = '57,55,57,49,48,50,55,51,52,49,55,49,49,56,49,57'
var qenP = '102,111,111,114,101,116,116,68,55,118,99,66,97,119,116,51'
var penP = '85,86,105,99,48,54,116,112,88,103,77,78,105,65,112,109'
// 灰度
var ivT = '49,50,51,52,53,54,55,56,57,48,49,50,51,52,53,54'
var qenT = '66,72,116,81,82,101,112,88,69,66,87,108,101,55,67,74'
var penT = '116,54,77,111,69,90,57,52,115,48,98,68,79,97,119,115'
/**
 * aes加密
 * @message 需要加密的字符串
 */
function encryptByAES (message) {
  // var keyHex = CryptoJS.enc.Utf8.parse(key);
  var key = CryptoJS.enc.Utf8.parse(byteToString(qenP.split(',')))
  var iv = CryptoJS.enc.Utf8.parse(byteToString(ivP.split(',')))
  if (window.location.href.indexOf('cmcc-app-test') > -1) {
    key = CryptoJS.enc.Utf8.parse(byteToString(qenT.split(',')))
    iv = CryptoJS.enc.Utf8.parse(byteToString(ivT.split(',')))
  }
  message = CryptoJS.enc.Utf8.parse(message)
  var encrypted = CryptoJS.AES.encrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })
  return encrypted.toString()
};
/**
 * aes解密 （本地数据专用）
 * @message 需要加密的字符串
 */
function decryptByAESStorage (message) {
  var key = CryptoJS.enc.Utf8.parse(byteToString(qenP.split(',')))
  var iv = CryptoJS.enc.Utf8.parse(byteToString(ivP.split(',')))
  if (window.location.href.indexOf('cmcc-app-test') > -1) {
    key = CryptoJS.enc.Utf8.parse(byteToString(qenT.split(',')))
    iv = CryptoJS.enc.Utf8.parse(byteToString(ivT.split(',')))
  }
  var decrypted = CryptoJS.AES.decrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })
  return CryptoJS.enc.Utf8.stringify(decrypted)
};
/**
 * aes解密
 * @message 需要加密的字符串
 */
function decryptByAES (message) {
  // var keyHex = CryptoJS.enc.Utf8.parse(key);
  var key = CryptoJS.enc.Utf8.parse(byteToString(penP.split(',')))
  var iv = CryptoJS.enc.Utf8.parse(byteToString(ivP.split(',')))
  if (window.location.href.indexOf('cmcc-app-test') > -1) {
    key = CryptoJS.enc.Utf8.parse(byteToString(penT.split(',')))
    iv = CryptoJS.enc.Utf8.parse(byteToString(ivT.split(',')))
  }
  var decrypted = CryptoJS.AES.decrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })
  return CryptoJS.enc.Utf8.stringify(decrypted)
};
/**
 *  从本地 localStorage 提取数据
 */
function getLocalStorage (name) {
  let storageData = null
  if (window.localStorage) {
    storageData = localStorage.getItem(name)
    if (storageData) {
      storageData = JSON.parse(decryptByAESStorage(storageData))
    }
  }
  return storageData
}

export default async ({
  method = 'POST',
  url,
  data,
  noEncrypt = false, // 不加密
  noLoading = false, // 不弹 loading
  storageName = false // 是否将接口数据存到本地 localStorage， 是的话这个参数就是 localStorage 的名字
}) => {
  if (!noLoading) {
    leadeon_Loading()
  }
  method = method.toUpperCase()
  data = JSON.stringify(data)
  let myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  // 默认不填写是需要加密的
  if (!noEncrypt && url.indexOf('app.10086.cn') > -1) {
    myHeaders.append('x-qen', '1')
    data = encryptByAES(data)
  }

  let fetchConfig = {
    method,
    headers: myHeaders,
    mode: 'cors',
    cache: 'no-cache'
  }

  if (method === 'POST') {
    fetchConfig = {
      ...fetchConfig,
      body: data
    }
  }

  /**
   * 为了给 fetch 增加超时处理， 所以需要用 Promise.race 包装两个 Promise
   * Promise.race 是将多个 Promise 包装起来，第一个 Promise 执行完毕返回的值就是 Promise.race 的最终值
   * （es6 Promise 教程）http://es6.ruanyifeng.com/#docs/promise#Promise-race
   */
  return Promise.race([
    fetch(url, fetchConfig).then(response => {
      return response.json()
    }).then(data => {
      if (!noLoading) {
        leadeon_EndLoading()
      }
      // 接口正常返回
      if (data.body) {
        data = decryptByAES(data.body)
        data = JSON.parse(data)
      }
      // 保存到本地
      if (storageName && data.retCode === '000000') {
        if (window.localStorage) {
          localStorage.setItem(storageName, encryptByAES(JSON.stringify(data)))
        }
      }
      // 从本地提取
      if (storageName && data.retCode !== '000000') {
        data = getLocalStorage(storageName) ? getLocalStorage(storageName) : data
      }
      return data
    }).catch(err => {
      console.log('fetch Error:', err)
      // 去掉弹框
      if (!noLoading) {
        leadeon_EndLoading()
      }
      // 接口报错 404， 500 相关的错误
      let data = {
        retCode: '999999',
        retDesc: '请求无法受理，请稍后再试!'
      }
      // 取 localStorage 数据，如果有就会覆盖错误提示
      if (window.localStorage && storageName) {
        data = getLocalStorage(storageName) ? getLocalStorage(storageName) : data
      }

      return data
    }),
    // 超时处理
    new Promise(function (resolve, reject) {
      setTimeout(() => {
        // 去掉弹框
        if (!noLoading) {
          leadeon_EndLoading()
        }
        // 接口报错 404， 500 相关的错误
        let data = {
          retCode: '999999',
          retDesc: '接口请求超时，请稍后再试!'
        }
        // 取 localStorage 数据，如果有就会覆盖错误提示
        if (window.localStorage && storageName) {
          data = getLocalStorage(storageName) ? getLocalStorage(storageName) : data
        }

        resolve(data)
      }, 30000)
    })
  ])
}
