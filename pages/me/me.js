var app = getApp()
Page({
  data: {
    hasLogin:true,/* wx.canIUse('button.open-type.getUserInfo'),*/
    userInfo: {},
    userListInfo: [{
      icon: '/resources/iconfont-order.png',
      text: '全部订单',
      isunread: true,
      unreadNum: 2,
      url: "/pages/order/order"
    }, {
        icon: '/resources/iconfont-address.png',
      text: '地址管理',
      isunread: false,
      unreadNum: 2,
      url: "/pages/me/address"
    }]
  },
 
  onLoad: function () {
    var that=this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo=res.userInfo;
              console.log("me")
              that.setData({
                userInfo:res.userInfo
              })
  
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  jumpUrl: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },

})