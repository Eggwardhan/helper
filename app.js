//app.js
App({
  onLaunch: function () {
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var code=res.code;
        if(code){
          if(that.globalData.auth==""){
            wx.request({
              url:"https://www.bupt404.cn/login?code="+code,
              method:'POST',
              success:function(res){
                console.log(res)
                let auth1=res.data.auth
                wx.setStorageSync('auth1',auth1);

              }
            })
            wx.getUserInfo({
              success:function(res){
                userInfo
                wx.setStorageSync('userInfo',res.userInfo)
              }
            })
          }
          else{console.log("auth:"+that.globalData.auth)}
        }
        else{
          console.log('fail to get login !'+res.errMsg)
        }
      }
    })
   
  
  },
  globalData: {
    userInfo: null,
    hasAuth:null,
    hasRegister:true
  }
})