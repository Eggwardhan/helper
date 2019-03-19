Page({
  data: {
    noMsg:false,
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

      wx.request({
        url: 'https://www.bupt404.cn/accept.php',
        method: "GET",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          openid: e.currentTarget.id,
          task_id: e.currentTarget.dataset.task_id,
          task_status: '0'
        },
        success:(res)=>{
            console.log(res)
          wx.showToast({
            title: '已接受',
            icon: 'success',
            duration: 1500,
            success: () => {
                wx.navigateTo({
                  url: '/pages/me/me',
                })
            }
          })
        },
        fail:(res)=>{
          console.log(res)
        }
      })
    
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
          if (res.data.status == '20001') {
            this.setData({ noMsg: true })
          }
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