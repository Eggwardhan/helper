// pages/detail/detail.js
var app = getApp();
//var getm1=this.selectComponent('#mark1');
Page({
  data: {
    hasPart: false,
    situation: "预约",
    avatarUrl: '../../resources/active.png',
    realname: 'eggwardhan',
    user_intro: '一个不会pop的dj不是好程序员',
    task_place: '代码全不对',
    demand: '如果你看到这段话说明：a任务丢失了. b程序出Bug了.',
    dates: '2019-9-9',
    startTime: '10:50',
    endTime: '19:50',
    partid: [],
    task_status: '4',
    task: [{}],
    evaluated: false
  },

  evaluate() {
    let partid = this.data.partid
    console.log(partid)
    var that = this;
    if (wx.getStorageSync("openid") == this.data.openid) {
      wx.request({
        url: "https://www.bupt404.cn/mark.php",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        data: {
          task_id: that.data.task_id,
          partid: that.data.partid,
          p_punctual_mark: wx.getStorageSync("mark1"),
          p_focus_mark: wx.getStorageSync("mark2"),
          p_attitude_mark: wx.getStorageSync("mark3")
        },
        success: (e) => {
          console.log(e)
          this.setData({
            evaluated: true
          })
          wx.showToast({
            title: '您已评价！',
            icon: 'success',
            duration: 2000
          })
        },
        fail: (err) => {
          console.log(err)
          wx.showToast({
            title: '评价失败！',
            icon: 'warn',
            duration: 2000
          })
        }
      })
      //if (wx.getStorageSync("openid") == this.data.partid) 
    } else if(wx.getStorageSync("openid") == this.data.partid)  {
      wx.request({
        url: "https://www.bupt404.cn/mark.php",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
        data: {
          task_id: that.data.task_id,
          openid: that.data.openid,
          o_punctual_mark: wx.getStorageSync("mark1"),
          o_focus_mark: wx.getStorageSync("mark2"),
          o_attitude_mark: wx.getStorageSync("mark3")
        },
        success: (e) => {
          console.log(e)
          this.setData({
            evaluated: true
          })
          wx.showToast({
            title: '您已评价！',
            icon: 'success',
            duration: 2000
          })
        },
        fail: (err) => {
          console.log(err)
          wx.showToast({
            title: '评价失败！',
            icon: 'warn',
            duration: 2000
          })
        }
      })
    }
  },
  mark: (event) => { //评分
    //console.log(event.detail.value)
    var tmp = event.detail.rate;
    switch (event.currentTarget.id) {
      case "mark1":
        wx.setStorageSync("mark1", tmp)
        break;
      case "mark2":
        wx.setStorageSync("mark2", tmp)
        break;
      case "mark3":
        wx.setStorageSync("mark3", tmp)
        break;
    }

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
    }
    else if (task_status == '0' && this.data.openid != wx.getStorageSync('openid') && this.data.hasPart) {
      wx.showToast({
        title: '您已预约，请耐心等待！',
        icon: 'none',
        duration: 2000//持续的时间

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
            situation: "已预约",
            hasPart: true
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
                  success: (res) => {
                    wx.switchTab({
                      url: '/pages/discover/discover',
                    })
                  }
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
    }
    else if (task_status == "4") {
      this.setData({
        situation: "已完成"
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
      // } else if (task_status == '1' && that.data.hasPart) {
    } else if (task_status == '1') {
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
       // console.log(this.data.hasPart)
        break;
      }
      i = i + 1;
    }
  },
  comment() {
    wx.showToast({

      title: '评论留言功能尚在开发当中',

      icon: 'none',

      duration: 2000

    })
  },
  onLoad: function (options) {

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
          partid: res.data.partid
        })
        this.check_status();
      }
    })
    let fuck = wx.getStorageSync('task')
    console.log(fuck)
    this.check_part(fuck.partid);
    //partid: JSON.stringify(res.data.partid)
  },


  onReady: function () {

  },

  onShow: function () {

  },


  onPullDownRefresh: function () {

  },

})