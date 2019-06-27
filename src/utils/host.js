/**
 * x 西安
 * t 灰度
 * p 生产
 * l 本地
 */
import env from './env'

let host_boss

let host_boss1

/**
 * v2.2西安外网地址：http://111.20.119.234:9080/biz-orange/
 * v2.2灰度地址：https://app.10086.cn/biz-V2.2/
 * v2.2正式地址：https://app.10086.cn/biz-orange/
 */
switch (env) {
  case 'x':
    host_boss = 'http://111.20.119.234:9080/biz-orange/'
    break
  case 't':
    // host_boss = 'https://app.10086.cn/biz-V2.2/'
    host_boss = 'https://www.easy-mock.com/mock/5d00a7defad3d113f09f7d43/biz-medicine/' // easymock地址
    break
  case 'p':
    host_boss = 'http://192.168.10.115:8185/biz-medicine/' // 西安接口地址
    // host_boss = 'https://app.10086.cn/biz-orange/'
    break
}
export {
  host_boss, host_boss1
}
