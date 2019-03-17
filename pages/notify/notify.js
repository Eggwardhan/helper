Page({
  data: {
    notifies: [{
      task_id: '1',
      avatarUrl: '/resources/active.png',
      realname: '小兄弟',
      task_place: '食堂',
      dates: '2019-02-33'
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
      url:'/pages/user/user?openid=+e.target.id'
    })
  },
  accept() {},
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.target.id,
    })
  },
  onLoad: function(options) {

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