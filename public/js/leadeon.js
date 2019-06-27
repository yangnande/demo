/**
 * js-sdk
 */
(function () {
  var u = navigator.userAgent;
  var android = u.indexOf('Android') > -1;
  //用于对外暴露,init只有在客户端为4.0版本才有
  var leadeon = {
    init: function () {},
    voiceRecogResult: function () {

    }
  };
  //判断为ios的wkwebview就吧leadeon.init赋空
  if (u.indexOf('wkwebview') > -1) {
    leadeon.init = null;
  }
  //各种能力的集合
  var businessNameS = [
    "queryInfo", //获取客户端基本信息
    "login", //拉起客户端登录页面
    "actionActivity", //打开新页面
    "queryAtInfo", //获取柜机信息
    "actionInterrogationPage", //返回患者id，并跳转到对应的问诊页面
    "actionFirstLevelPage", //跳转到问诊列表页
  ];

  /**
   * 设置回调成功的函数,并给客户端发送json数据,并构造leadeon结构体
   * @param {Object} os 前端传递的对象
   * @param {String} st 业务名称
   */
  function callNative(os, st) {
    if ("undefined" === typeof os) {
      os = {};
    }
    os.businessName = st;
    os.callbackSuccess = "callbackSuccess_" + os.businessName;
    os.callbackError = "callbackError_" + os.businessName;
    if ('undefined' === typeof os.debug) {
      os.debug = false;
    }
    if ('undefined' === typeof os.success) {
      os.success = function () {};

    }
    if ('undefined' === typeof os.error) {
      os.error = function () {};
    }
    leadeon["callbackChangeSuccess_" + os.businessName] = os.success;
    leadeon["callbackChangeError_" + os.businessName] = os.error;
    leadeon["callbackSuccess_" + os.businessName] = function (dates) {
      var jsonstr = dates;
      if (!!jsonstr && typeof (jsonstr) == "string") {
        if (android) { //android系统
          if (!!jsonstr) {
            jsonstr = JSON.parse(jsonstr); //安卓不支持传递对象，需要对传递的字符串转换
          }
        }
      }
      leadeon["callbackChangeSuccess_" + os.businessName](jsonstr);
    };
    leadeon["callbackError_" + os.businessName] = function (dates) {
      var jsonstr = dates;
      if (android) { //android系统
        if (!!jsonstr) {
          jsonstr = JSON.parse(jsonstr); //安卓不支持传递对象，需要对传递的字符串转换
        }
      }
      leadeon["callbackChangeError_" + os.businessName](jsonstr);
    };
    //传值完毕以后就删除多余的属性，没必要给客户端
    delete os.success;
    delete os.error;
    if (android) {
      newSdkInterface[os.businessName](JSON.stringify(os));
    }
  }

  businessNameS.forEach(function (businessName) {
    leadeon[businessName] = function (options) {
      callNative(options, businessName);
    }
  })

  window.leadeon = leadeon;
})()
