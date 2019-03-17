
Page({

  data: {
    task: null,
    date: null,
    startTime: null,
    endTime: null
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.currentTarget.dataset.id,
    })

  },
  onLoad: function (options) {
    wx.request({
      url: "https://www.bupt404.cn/mydates.php",
      method: "GET",
      header: { "Content-Type": "json" },
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: (res) => {
        this.setData({
          task: res.data
        })
      }
    })
  },


  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})