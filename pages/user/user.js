// pages/user/user.js
var app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var radarChart = null;

Page({
  data: {
    avatarUrl: "/resources/active.png",
    realname: "韩四",
    schoolNumber:20172111111,
    schoolDepartment:"信息与通信工程学院",
    user_intro: "I am a cool guy",
    focus_mark:5,
    attitude_mark:5,
    punctual_mark:5
  },
  touchHandler: function (e) {
    console.log(redarChart.getCurrentDataIndex(e))
  },
  onLoad: function (options) {
    let userid = options.openid
    console.log(userid)
    wx.request({
      url: 'https://www.bupt404.cn/getmarks.php',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {openid:userid},
      success: (res) => {
        console.log(res)
        this.setData({
          focus_mark: res.data.focus_mark,
          attitude_mark: res.data.attitude_mark,
          punctual_mark: res.data.punctual_mark,
          avatarUrl: res.data.avatarUrl,
          schoolNumber: res.data.schoolid,
          user_intro: res.data.user_intro,
          schoolDepartment: res.data.schoolDepartment,
          realname: res.data.realname
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    let windowWidth = 380;
  /*  try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    console.log(windowWidth)
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }*/
    let that = this
    
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['守时评分', '学习态度', '专注程度'],
      series: [{
        name: 'Ta的评分',
        data: [that.data.punctual_mark,
          that.data.attitude_mark,
          that.data.focus_mark]
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 5
        }
      }
    });
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