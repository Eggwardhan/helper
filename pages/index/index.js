// pages/index/index.js
var util = require('../../utils/util.js')
const app = getApp()
var db = require('../../utils/db.js')
Page({
  data: {
    hasAuth: false,
    hasRegister: false,
    postDisable: true,
    schoolDepartmentList: ['信息与通信工程学院', '计算机学院', '自动化学院', '软件学院', '数字媒体与设计艺术学院', '现代邮政学院', '继续教育学院', '国际学院', '网络教育学院', '电子工程学院', '理学院', '经济管理学院', '公共管理学院', '人文学院', '马克思主义学院', '网络空间安全学院', '光电信息学院', '民族教育学院', '网络技术研究院', '叶培大创新学院'],
    departmentIndex: 0,
    gender: '男',
    schoolDepartment: '信息与通信工程学院',
    genderList: ['男', '女'],
    genderIndex: 0,
    date: null,
    startTime: null,
    endTime: null,
    demand: null,
    registerInfo:null
  },
  saveDate(e) {
    wx.request({
      url: 'https://www.bupt404.cn/order.php',
      method: "POST",
      header: { "content-type": "application/x-www-form-urlencoded"},
      data: {
        openid: wx.getStorageSync('openid'),
        task_place: this.data.place,
        dates: this.data.date,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        demand: this.data.demand
      },
      success: (res) => {
        console.log(res)
        let task_id=res.data.task_id
        
        if (res.data.status == 10000) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/detail/detail?task_id='+task_id,
                });
              }, 1500)
            }
          })
        }
        else if(res.data.status==20002){
          wx.showToast({
            title: '失败-已达上限',
            icon: 'warn',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                });
              }, 1500)
            }
          })
        }
      },
      fail: (res) => {
        console.log(res.errMsg)
        wx.showToast({
          title: '预约失败',
          icon: 'warn',
          duration: 2500,
          success: () => {
            wx.navigateTo({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },
  bindinput(e) {

    let reg;
    let that = this;
    switch (e.target.id) {

      case 'name':
        this.setData({
          name: e.detail.value
        });
        reg = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(e.detail.value)) {
          this.setData({
            nameWarn: false,
          })
        } else {
          this.setData({
            nameWarn: true,
          })
        }
        break;
      case "demand":
        var len = parseInt(e.detail.value.length)
        this.setData({
          demand: e.detail.value,
          wordNum: len
        })
        break;
      case "schoolId":
        this.setData({
          schoolId: e.detail.value
        });
        reg = /^\d{10}$/;
        if (reg.test(e.detail.value)) {
          this.setData({
            schoolIdWarn: false
          })
        } else {
          this.setData({
            schoolIdWarn: true
          })
        }
        break;
      case "phone":
        this.setData({
          phone: e.detail.value
        });
        reg = /^1\d{10}$/;
        if (reg.test(e.detail.value)) {
          this.setData({
            phoneWarn: false
          })
        } else {
          this.setData({
            phoneWarn: true
          })
        }
        break;
      case "schoolDepartment":
        this.setData({
          schoolDepartment: that.data.schoolDepartmentList[e.detail.value],
          departmentIndex: e.detail.value
        });
        break;
      case "gender":
        this.setData({
          gender: that.data.genderList[e.detail.value],
          genderIndex: e.detail.value
        });
        break;
      case "place":
        this.setData({
          place: e.detail.value,
          postDisable: false
        })
        console.log(that.data.place)

        console.log(that.data.postDisable)
        break;
      case "date":
        this.setData({
          date: e.detail.value
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
    this.getSaveBtn();
  },

  getSaveBtn() {
    if (this.data.name && this.data.schoolId && this.data.phone && this.data.hasAuth &&
      !this.data.nameWarn && !this.data.schoolIdWarn && !this.data.phoneWarn) {
      this.setData({
        allowSave: true
      })
    } else {
      this.setData({
        allowSave: false
      })
    }
  },
  saveInfo() {
    wx.request({
      url: "https://www.bupt404.cn/postinfo.php",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        openid: wx.getStorageSync('openid'),
        realname: this.data.name,
        schoolid: this.data.schoolId,
        phone: this.data.phone,
        schoolDepartment: this.data.schoolDepartment,
        gender: this.data.gender,
        avatarUrl:wx.getStorageSync("userinfo").avatarUrl
      },
      method: "POST",
      
      success: res => {
        this.setData({
          hasRegister:true
        })
      if (res.data=10000) {

          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                });
              }, 1500)
            }
          })
 
        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },

  onGotUserInfo(e) {
    this.setData({
      hasAuth: true
    })
    this.getSaveBtn();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var time = util.formatTime(new Date());
    var timee = util.formatTimeX(new Date());
    console.log(time)
    let reg = /\s/
    let time1 = time.split(reg)
    let timee1 = timee.split(reg)
    time1[0] = time1[0].replace(/\//g, '-')
    time1[1] = time1[1].replace(/\:\d{2}$/, '')
    timee1[1] = timee1[1].replace(/\:\d{2}$/, '')
    this.setData({
      startTime: time1[1],
      date: time1[0],
      endTime: timee1[1]
    })

    if (!this.data.hasRegister) {
      wx.request({
        url: 'https://www.bupt404.cn/checkregister.php',
        method: 'GET',
        data: {
          openid:wx.getStorageSync('openid')
        },
        header: {},
        success: (res) => {
          console.log(res)
          if(res.data.status=="10000")
          this.setData({
            hasRegister: true,
           // registerInfo: res.data.registerInfo
          })
        },
        fail:(res)=>{
          console.log(res)
        }
      })
    }

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            hasAuth: true
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              wx.setStorageSync('userInfo', res.userInfo)

            }
          })
        }
      }
    })
    /*console.log(app.globalData.hasAuth)

    this.setData({
      hasAuth: app.globalData.hasAuth,
      hasRegister: app.globalData.hasRegister
    })
    console.log(this.data.hasAuth)*/
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