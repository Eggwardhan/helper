// pages/detail/detail.js
Page({
  data: {
    situation: "预约",
    avatarUrl: '../../resources/active.png',
    realname: 'eggwardhan',
    user_intro: '一个不会pop的dj不是好程序员',
    task_place: '代码全不对',
    demand: '如果你看到这段话说明程序出Bug了',
    dates: '2019-9-9',
    startTime: '10:50',
    endTime: '19:50'
  },
  reserve() {
    let task_status=this.data.task_status;
    if (task_status == 1&&this.data.openid != wx.getStorageSync('openid')) {//预约
      wx.request({
        url: 'https://www.bupt404.cn/date???',
        method: 'GET',
        data: { openid: wx.getStorageSync('openid') ,
                  task_id:this.data.task_id,
                  task_status:'0'},
        success: (res) => {
          console.log(res)
          this.setData({task_status:"0"})
          wx.showToast({
            title: '已发起预约',
            icon: 'success',
            duration: 1500,
          })
        }
      })
    }
    else if (task_status == 1&&this.data.openid == wx.getStorageSync('openid')){//删除
      wx.request({
        url: 'https://www.bupt404.cn/date???',
        method: 'GET',
        data: { 
          openid: wx.getStorageSync('openid'),
          task_id:this.data.task_id,
          task_status:'2'
           },
        success: (res) => {
          console.log(res)
          this.setData({task_status:'2'})
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500,
          })
        }
      })
    }else{return}
  this.check_status();
  },
  check_status() {
    let task_status=this.data.task_status;
    if (task_status == '0'&&this.data.openid != wx.getStorageSync('openid')) {
      this.setData({
        situation: "预约"
      })
    }
    else if (task_status == '0'&& this.data.openid==wx.getStorageSync('openid')){
      this.setData({
        situation: "删除预约"
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
    }
    else if (task_status == 3) {
      this.setData({
        situation: "已过期"
      })
    }
    else if (task_status == '1'&&this.data.partid!=wx.getStorageSync('openid')) {
      this.setData({
        situation: "已组队"
      })
    }
  },
  onLoad: function (options) {
    let that = this;
    let task_id=options.task_id
    this.setData({
      task_id:task_id
    })

    wx.request({
      url: 'https://www.bupt404.cn/datedetail.php',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      data: { task_id: options.task_id },
      success: (res) => {
        console.log(res)
        this.setData({
          realname: res.data.realname,
          user_intro: res.data.user_intro,
          openid:res.data.openid,
          dates: res.data.dates,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
          avatarUrl: res.data.avatarUrl,
          task_place: res.data.task_place,
          demand: res.data.demand,
          task_status:res.data.task_status,
          partid:res.data.partid

        })
        this.check_status();
      }
    })
  },


  onReady: function () {

  },

  onShow: function () {

  },


  onPullDownRefresh: function () {

  },

})