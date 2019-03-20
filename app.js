//app.js
App({
  onLaunch: function() {
    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('openid')) {
      // 登录
      wx.login({
        success: res => {
          var code = res.code;
          if (code) {
            wx.request({
              url: "https://www.bupt404.cn/login.php",
              data: {
                code: code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function(e) {
                console.log(e)
                console.log(e.data)
                let openid = e.data[0]['openid']
                let session_key = e.data[0]['session_key']
                wx.setStorageSync('openid', openid);
                wx.setStorageSync('session_key', session_key)

              }
            })
            wx.getUserInfo({
              success: function(res) {
                userInfo
                wx.setStorageSync('userInfo', res.userInfo)
              }
            })
          } else {
            console.log('fail to get login !' + res.errMsg)
          }
        }
      })
    }

  },
  globalData: {
    userInfo: null,
    hasAuth: null,
    hasRegister: null,
    code: null,
    openid: "",
    session_key: "",
    partid: []
  }
})