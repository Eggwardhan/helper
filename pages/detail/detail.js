// pages/detail/detail.js
Page({
  data: {
    task: {
      avatar_img: '../../resources/active.png',
      rea_name: 'eggwardhan',
      user_intro:'一个不会pop的dj不是好程序员',
      task_place: '教室S316',
      description: '敲李来来的代码内容充足，有着丰厚的',
      date: '2019-9-9',
      startTime: '10:50',
      endTime: '19:50'
    }
  },
 
  onLoad: function (options) {
    let that=this;
    console.log(options)
        wx.request({
          url:'https://www.bupt404.cn/getDetail',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method:'GET',
          data:{task_id:options.task_id},
          success:(res)=>{
            that.setData({
              task:res.data.task
            })
          }
        })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
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