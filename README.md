# 医疗项目

> 医疗项目内嵌 web 工程，工程新特性包括：二级目录、分目录打包、分环境打包、manifest 缓存配置、接口自动 loading 效果、接口数据缓存配置、命令快速创建新页面。

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev --fileName1!fileName2

# build for production with minification
npm run build p  # 打包所有页面
npm run build p/fileName1  # 打包单个页面
npm run build p/fileName1!fileName2  # 打包多个页面
# 注: fileName为src下一级目录
```
## 部署线上
> 执行 gulp 即可
## 公用方法

> 详见 utils/common.js， 里边包含了所有你可能用到的方法，初次使用工程前请详细阅读此 js 文件，可以使你的开发速度提高数倍

## img问题

html里边引用的图片后缀改为大写

e.g:

> logo.PNG

## manifest.json

如果页面需要 manifest 缓存，只需要在 build/manifestSet.js 的 `setFileName` 里边追加页面地址。

e.g:

```javascript
exports.setFileName = [
  {
    folder: 'navigation',
    name: 'navigation'
  }
]
```

## new page
用 leadeon-c 命令快速创建新页面

e.g:


```bash
# 在 folderName 目录中新建 pageName 页面
leadeon-c pageName in folderName
```

## 接口 loading 效果
 loading 效果已经集成在 fetch 里，默认显示，如果不需要，请在接口请求时加上 `noLoading: true` 参数：
 ```javascript
  fetch(userInfo, {
    ...
  }, noLoading: true)
 ```

## 接口 localStorage 缓存配置
localStorage 缓存已经集成在 fetch 里， 默认不缓存，如果需要缓存接口数据，请在接口请求处加上 `storageName: 'xxxxxxxxx'` 参数：
```javascript
  // name 命名规范为：页面名-接口简称-省编码 如果不区分省份可不写省编码，如果区分用户，则为： 页面名-接口简称-手机号码
  fetch(userInfo, {
    ...
  }, storageName: 'find-icon-290') // 发现页-icon列表-陕西省的数据
```
