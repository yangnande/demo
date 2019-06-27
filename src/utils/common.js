/* eslint-disable*/
import CryptoJS from 'crypto-js'
let host = 'http://111.20.119.234:9080/medical/'
let box = {
  ct: "1",
  cv: "1.0",
  isLogin: "false",
  token: "",
  userId: ""
}

/**
 * 获取地址栏参数
 * @param {String} key
 */
function getQueryString (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  const arr = window.location.search.substring(1).match(reg)
  if (arr === null) return null
  return decodeURIComponent(arr[2])
}

/**
 * 获取药柜柜机信息
*/
async function getAtInfo() {
  return new Promise((resolve, reject) => {
    leadeon.queryAtInfo({
      debug: false,
      success: data => {
        resolve(data)
      },
      error: data => {
        reject(data)
      }
    })
  })
}

/*
 * 获取客户端基础信息(包含用户信息)
*/
async function getUserInfo() {
  try {
    return new Promise((resolve, reject) => {
      leadeon.queryInfo({
        debug: false,
        success: data => {
          resolve(data)
        },
        error: data => {
          reject(data)
        }
      })
    })
  } catch (e) {
    return box
  }
}

/**
 * 打开新 webview 页面
 * @param {String} url 需要打开的 url
 */
function openNewPage(url) {
  console.log(url)
  leadeon.actionActivity({
    htmlUrl: url,
    success: function (res) {},
    error: function (res) {}
  })
}

/**
 * 拉起客户端登录
*/
function showLogin () {
  leadeon.login({
    success: function (res) {},
    error: function (res) {}
  })
}

/**
 * 根据患者id和页面来源 并跳转到对应的问诊页面
 * @param { String } patientId
 * @param { String } type
*/
function toInquiryType(patientId, type) {
  console.warn(patientId, '---', type)
  leadeon.actionInterrogationPage({
    patientId: patientId,
    actionType: type,
    success: function (res) {},
    error: function (res) {}
  })
}

/**
 * 跳转到客户端问诊页面
*/
function toInquiry() {
  console.log('111')
  leadeon.actionFirstLevelPage({
    success: function(res) {},
    error: function(res) {}
  })
}

/**
 * 加密字符串
 * @param {*} message
 * @param {*} key
 * @returns
 */
function encryptByDES (message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * 解密字符串
 * @param {*} ciphertext
 * @param {*} key
 * @returns
 */
function decryptByDES (ciphertext, key) {
  var ciphertext = decodeURIComponent(ciphertext)
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export {
  host, // 页面统一前缀地址
  getQueryString,  // 获取url参数
  getUserInfo, // 获取登录用户信息，如果没有登录就强制登录，如果在客户端外，返回默认数据
  getAtInfo, // 获取药柜信息
  showLogin, // 拉起客户端登录页面
  openNewPage, // 打开新页面
  toInquiryType, // 跳转到对应的问诊页面
  toInquiry, // 跳转到问诊列表页
  encryptByDES, // 加密字符串
  decryptByDES // 解密字符串
}

