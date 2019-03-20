var app = getApp()
Page({
  data: {
    hasRegister: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    userListInfo: [{
      icon: '/resources/iconfont-order.png',
      text: '编辑资料',
      isunread: true,
      unreadNum: 2,
      url: "/pages/edit/edit"
    }, {
      icon: '/resources/iconfont-address.png',
      text: '消息提醒',
      isunread: false,
      unreadNum: 2,
      url: "/pages/notify/notify"
    },{
        icon: '/resources/iconfont-address.png',
        text: '我的自习',
        isunread: false,
        unreadNum: 0,
        url: "/pages/myTasks/myTasks"
    },
    {
      icon: '/resources/iconfont-address.png',
      text: '问题反馈',
      isunread: false,
      unreadNum: 0,
      url: "/pages/feedback/feedback"
    },
    {
      icon: '/resources/iconfont-address.png',
      text: '关于我们',
      isunread: false,
      unreadNum: 0,
      url: "/pages/about/about"
    }
    ]
  },

  onLoad: function () {
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo)
              app.globalData.userInfo = res.userInfo;
              console.log("me")
              that.setData({
                userInfo: res.userInfo
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
  register:function(){
    wx.switchTab({
      url: '/pages/ index/index'
    })
  },
  jumpUrl: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },

})