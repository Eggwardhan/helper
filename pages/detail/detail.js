// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    hasPart: false,
    situation: "预约",
    avatarUrl: '../../resources/active.png',
    realname: 'eggwardhan',
    user_intro: '一个不会pop的dj不是好程序员',
    task_place: '代码全不对',
    demand: '如果你看到这段话说明程序出Bug了',
    dates: '2019-9-9',
    startTime: '10:50',
    endTime: '19:50',
    partid: [],
    task_status: null,
    task: [{}]
  },
  reserve() { //点击按钮事件
    let task_status = this.data.task_status;
    if (!wx.getStorageSync('hasRegister')) {
      wx.showToast({
        title: '未注册',
        icon: 'warn',
        success: () => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    } else if (task_status == '0' && this.data.openid != wx.getStorageSync('openid') && !this.data.hasPart) { //预约
      wx.request({
        url: 'https://www.bupt404.cn/handshake.php',
        method: 'GET',
        data: {
          openid: wx.getStorageSync('openid'),
          task_id: this.data.task_id,
          task_status: '0'
        },
        success: (res) => {
          console.log(res)
          this.setData({
            situation: "已预约"
          })
          wx.showToast({
            title: '已发起预约',
            icon: 'success',
            duration: 1500,
          })
        },
        fail: (res) => {
          console.log(res)
        }
      })
    } else if (task_status == '0' && this.data.openid == wx.getStorageSync('openid')) { //删除
      wx.showModal({
        title: 'warning',
        content: '确认删除此预约吗？',
        success: (res) => {
          if (res.confirm) {
            wx.request({
              url: 'https://www.bupt404.cn/handshake.php',
              method: 'GET',
              data: {
                openid: wx.getStorageSync('openid'),
                task_id: this.data.task_id,
                task_status: '2'
              },
              success: (res) => {
                console.log(res)
                this.setData({
                  task_status: '2'
                })
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500,
                })
              }
            })
          } else {
            return
          }
        }
      })
    } else {
      console.log('fail')
      return
    }
    this.check_status();
  },

  check_status() {
    let that = this;
    let task_status = this.data.task_status;
    if (task_status == '0' && that.data.openid != wx.getStorageSync('openid') && that.data.hasPart == true) {
      console.log("already")
      this.setData({
        situation: "已预约"
      })
    } else if (task_status == '0' && that.data.openid != wx.getStorageSync('openid')) {
      this.setData({
        situation: "预约"
      })
    } else if (task_status == '0' && that.data.openid == wx.getStorageSync('openid')) {
      this.setData({
        situation: "预约中"
      })
    }
    /* else if (task_status == '0'&&this.data.partid==wx.getStorageSync('openid')) {
       this.setData({
         situation: "取消预约"
       })
     }*/
    else if (task_status == '2') {
      this.setData({
        situation: "已删除"
      })
    } else if (task_status == '3') {
      this.setData({
        situation: "已过期"
      })
    } else if (task_status == '1' && that.data.hasPart) {
      this.setData({
        situation: "进行中"
      })
    } else {
      return
    }
  },
  check_part(e) {
    console.log(e)
    var i = Number('0');
    while (e[i]) {
      if (e[i] == wx.getStorageSync('openid')) {
        this.setData({
          hasPart: true
        })
        console.log(this.data.hasPart)
        break;
      }
      i = i + 1;
    }
  },
  onLoad: function(options) {
    let that = this;
    let task_id = options.task_id
    this.setData({
      task_id: task_id
    })
    wx.request({
      url: 'https://www.bupt404.cn/datedetail.php',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      data: {
        task_id: options.task_id
      },
      success: (res) => {
        wx.setStorageSync('task', res.data)
        this.setData({
          task: res.data,
          realname: res.data.realname,
          user_intro: res.data.user_intro,
          openid: res.data.openid,
          dates: res.data.dates,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
          avatarUrl: res.data.avatarUrl,
          task_place: res.data.task_place,
          demand: res.data.demand,
          task_status: res.data.task_status,
          partid: JSON.stringify(res.data.partid)
        })
        this.check_status();
      }
    })
    let fuck = wx.getStorageSync('task')
    //  console.log(fuck.partid)
    this.check_part(fuck.partid);
  },


  onReady: function() {

  },

  onShow: function() {

  },


  onPullDownRefresh: function() {

  },

})