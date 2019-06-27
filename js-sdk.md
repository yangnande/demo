所有接口通过 leadeon 对象来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：

· success：接口调用成功时执行的回调函数。

· error：接口调用失败时执行的回调函数。

成功时返回对应业务类型的 js 对象（无返回值则不返回数据），失败时返回固定 js 对象。

```javascript
{
        success: function (res) {},
        error: function (res) {}
}
```

### 1. **打开新页面**

 无返回值

 ```javascript
leadeon.actionActivity({
        htmlUrl: 'https://www.baidu.com',
        success: function (res) {},
        error: function (res) {}
})
 ```

### 2. **获取药柜信息**

 有返回值，atmId可能为空。为空表示还没有选中药柜
  ```javascript
leadeon.queryAtInfo({
        success: function (res) {
                atmId: '123123',
                atmName: '开始交电费卡三等奖',
                atmAddr: '北京西二环'
        },
        error: function (res) {}
})
  ```


### 3. **返回患者id，并跳转到对应的问诊页面**

 无返回值，actionType取值为 a 视频问诊 b 语音问诊 c 图文问诊
```javascript
leadeon.actionInterrogationPage({
        patientId: '患者id',
        actionType: '问诊页面type',
        success: function (res) {},
        error: function (res) {}
})
  ```



### 4. **获取客户端基本信息**

有返回值，返回如下信息

```javascript
leadeon.queryInfo({
    success: function (res) {
        userId: '18334764004',
        cv: '1.0.0',
        ct: '1',  //1表示android
        token:'1skjfskdfjk',
        islogin:'true',
     },
     error: function (res) {}
})
```


### 5. **拉起**客户端登录页面

无返回值

```javascript
leadeon.login({
    success: function (res) {},
    error: function (res) {}
})
```

### 6. 跳转到智慧问诊页面（首页第二个页面）

无返回值

```javascript
leadeon.actionFirstLevelPage({
    success: function(res) {},
    error: function(res) {}
})
```




















