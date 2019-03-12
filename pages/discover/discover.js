// pages/discover/discover.js
Page({

  data: {
    searchActive: false,
    schoolDepartmentList: ['信通', '计院', '邮政', '软工', '国院', '电子', '理学院', '经管', '人文', '网安'],
    departmentIndex: 0,
    task: [{
              avatar_img:'../../resources/active.png',
              user_name:'eggwardhan',
              task_place: '小树林有无????',        
              description:'寻一个安静的老板',
              date:'2019-9-9',
              startTime:'10:50',
              endTime:'19:50'
              

    },{
        avatar_img: '../../resources/active.png',
        user_name: '我是谁我在那',
        task_place:'图书馆3lS46',        
        description: '是兄弟就来肝我',
        date: '2019-9-9',
        startTime: '10:50',
        endTime: '19:50'

    }]
  },


  onLoad: function (options) {

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