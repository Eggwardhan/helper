// pages/discover/discover.js
Page({

  data: {
    searchActive: false,
    schoolDepartmentList: ['不限', '信息与通信工程学院', '计算机学院', '自动化学院', '软件学院', '数字媒体与设计艺术学院', '现代邮政学院', '继续教育学院', '国际学院', '网络教育学院', '电子工程学院', '理学院', '经济管理学院', '公共管理学院', '人文学院', '马克思主义学院', '网络空间安全学院', '光电信息学院', '民族教育学院', '网络技术研究院', '叶培大创新学院'],
    departmentIndex: 0,
    task: [{
      task_id: '123sss',
      avatar_img: '../../resources/active.png',
      realname: '我是谁我在那',
      task_place: '貌似网络走丢了哦',
      demand: '请刷新或联系管理员',
      dates: '5555-5-5',
      startTime: '00:00',
      endTime: '23:33'

    }],
    search_task_list: null,
    dates: null,
    startTime: null,
    endTime: null
    ///departmentSearch:null
  },
  search_task(e) {
    console.log(typeof (this.data.dates))
    console.log(typeof (this.data.startTime))
    wx.request({
      url: 'https://www.bupt404.cn/filter.php',
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        dates: this.data.dates,
        startTime: this.data.startTime
      },
      success: (res) => {
        console.log(res)
        this.setData({
          search_task_list: res.data
        })
        if (res.data.status == "20001") {
          console.log("fail")
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })

  },
  searchClick(e) {
    this.setData({
      searchActive: !this.data.searchActive
    })
    if (e.target.id == 'cancel') {
      this.setData({
        search_task_list: null
      })
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.currentTarget.dataset.id,
    })

  },
  bindinput(e) {
    let reg;
    let that = this;
    switch (e.target.id) {
      case "schoolDepartment":
        this.setData({
          schoolDepartment: that.data.schoolDepartmentList[e.detail.value],
          departmentIndex: e.detail.value
        });
        break;

      case "dates":
        this.setData({
          dates: e.detail.value
        });
        break;
      case "startTime":
        this.setData({
          startTime: e.detail.value
        });
        break;
      case "endTime":
        this.setData({
          endTime: e.detail.value
        });
        break;

    }
  },
  queryall(e){
    wx.request({
      url: "https://www.bupt404.cn/queryall.php",
      method: "GET",
      header: { "Content-Type": "json" },
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: (res) => {
        console.log(res)
        this.setData({
          task: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    wx.request({
      url: "https://www.bupt404.cn/queryall.php",
      method: "GET",
      header: { "Content-Type": "json" },
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: (res) => {
        console.log(res)
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

  onPullDownRefresh: function () {
    wx.request({
      url: "https://www.bupt404.cn/queryall.php",
      method: "GET",
      header: { "Content-Type": "json" },
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: (res) => {
        console.log(res)
        this.setData({
          task: res.data
        })
      }
    })
    /*setTimeout(() => {
      wx.showNavigationBarLoading() //在标题栏中显示加载
    }, 1500)*/

    wx.stopPullDownRefresh()

  },

  onShareAppMessage: function () {

  }
})