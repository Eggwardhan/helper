// pages/discover/discover.js
Page({

  data: {
    searchActive: false,
    schoolDepartmentList: ['不限','信息与通信工程学院', '计算机学院', '自动化学院', '软件学院', '数字媒体与设计艺术学院', '现代邮政学院', '继续教育学院', '国际学院', '网络教育学院', '电子工程学院', '理学院', '经济管理学院', '公共管理学院', '人文学院', '马克思主义学院', '网络空间安全学院', '光电信息学院', '民族教育学院', '网络技术研究院', '叶培大创新学院'],
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
    datess:null,
    startTime:null,
    endTime:null
    ///departmentSearch:null
  },
  search_task(e){
    wx.request({
      url:'https://www.bupt404.cn/search_task.php',
      methond:"POST",
      data:{
        datess:this.data.datess,
        startTime:this.data.startTime,
        endTime:this.data.endTime,
        department: this.data.schoolDepartmentList[departmentIndex]
      },
      success:(res)=>{
          this.setData({
            task:res.data.task
          })
      },
      fail:(res)=>{
          console.log(res)
      }
    })
    
  },
  searchClick(e){
    this.setData({
      searchActive:!this.data. searchActive
    })
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
  onLoad: function (options) {
      wx.request({
        url:"https://www.bupt404.cn/queryall.php",
        method:"GET",
        header:{"Content-Type":"json"},
        data:{
          openid:wx.getStorageSync("openid")
        },
        success:(res)=>{
          console.log(res)
          this.setData({
              task:res.data
          })
        }
      })
  },

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