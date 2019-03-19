
Page({

  data: {
    task: null,
    date: null,
    startTime: null,
    endTime: null,
    situation:""
  },
  /*
  bindTap(e) {
    if (e.currentTarget.task_status == '0'&&wx.getStorageSync('openid')) {
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
        }
      })
    }
  },
*/
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.currentTarget.id,
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
        console.log(this.data.task)
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