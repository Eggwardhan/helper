Page({
  data: {
    notifies: [{
      openid:"OOxxsssooiii",
      task_id: '1',
      avatarUrl: '/resources/active.png',
      realname: '小兄弟',
      task_place: '食堂',
      dates: '2019-02-33',
      task_status:'0'
    }, {
      task_id: '2',
      avatarUrl: '/resources/active.png',
      realname: '大兄弟',
      task_place: '食堂',
      dates: '2019-02-33'
    }]
  },
  getUser(e) {
    wx.navigateTo({
      url: '/pages/user/user?openid='+e.currentTarget.id
    })
  },
  accept(e) {
    if (e.currentTarget.task_status == '0') {
      wx.request({
        url: 'https://www.bupt404.cn/handshake.php',
        method: "GET",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          openid: wx.getStorageSync('openid'),
          task_id: e.currentTarget.id,
          task_status: '0'
        },
        success:(res)=>{
            console.log(res)
        },
        fail:(res)=>{
          console.log(res)
        }
      })
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.currentTarget.id,
    })
  },
  onLoad: function(options) {
      wx.request({
        url: 'https://www.bupt404.cn/permission.php',
        method:"GET",
        data:{openid:wx.getStorageSync('openid')},
        success:(res)=>{
          console.log(res)
          this.setData({
            notifies:res.data
          })
        }
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})