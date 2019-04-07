var app=getApp();
import {String} from '../../utils/util.js'

Page({
  data: {
    noMsg:false,
    notify1: [{
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
    }],
    notify2:[{}],
    notify3:[{}]
  },

  getUser(e) {
    wx.navigateTo({
      url: '/pages/user/user?openid='+e.currentTarget.id
    })
  },
 /* readMsg(e){
    console.log(res)
    wx.request({
      url: 'https://www.bupt404.cn/readmsg.php',
      method:"GET",
      data:{
        openid:wx.getStorageSync("openid"),
        task_id:e.currentTarget.dataset.task_id
      },
      success:(res)=>{
        console.log(res)
      }

    })
  },*/
  accept(e) {
    console.log(e)
      wx.request({
        url: 'https://www.bupt404.cn/accept.php',
        method: "GET",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          openid: e.currentTarget.id,
          task_id: e.currentTarget.dataset.task_id,
          task_status: '0',
          choice:"accept"
        },
        success:(res)=>{
            console.log(res)
          wx.showToast({
            title: '已接受',
            icon: 'success',
            duration: 1500,
            success: () => {
                wx.switchTab({
                  url:'/pages/me/me',
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
    wx.request({
      url: 'https://www.bupt404.cn/readmsg.php',
      method: "GET",
      data: {
        openid: wx.getStorageSync("openid"),
        task_id: e.currentTarget.id
      },
      success: (res) => {
        console.log(res)
      }

    })
    wx.navigateTo({
      url: '/pages/detail/detail?task_id=' + e.currentTarget.id,
    })
  },
  onLoad: function(options) {
     app.globalData.isunread=false;
      wx.request({                //？？？
        url: 'https://www.bupt404.cn/permission.php',
        method:"GET",
        data:{openid:wx.getStorageSync('openid')},
        success:(res)=>{
          var xx = res.data;
          if (String.isBlank(xx[0]) && String.isBlank(xx[1]) && String.isBlank(xx[2])) {
            this.setData({ noMsg: true })
          }
          this.setData({
            notify1:res.data[0],
            notify2: res.data[1],
            notify3: res.data[2]
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