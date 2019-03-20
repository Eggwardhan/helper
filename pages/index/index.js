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
    demand: "  0 . 0 这个小伙伴要求不多哦，大家快来约TA吧～",
    registerInfo: null
  },
  saveDate(e) {
    wx.request({
      url: 'https://www.bupt404.cn/order.php',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
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
        let task_id = res.data.task_id

        if (res.data.status == 10000 && res.data.task_id != 0) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/detail/detail?task_id=' + task_id,
                });
              }, 1500)
            }
          })
        } else if (res.data.status == 20002) {
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
      method: "POST",
      data: {
        openid: wx.getStorageSync('openid'),
        realname: this.data.name,
        schoolid: this.data.schoolId,
        phone: this.data.phone,
        schoolDepartment: this.data.schoolDepartment,
        gender: this.data.gender,
        avatarUrl: wx.getStorageSync("userInfo").avatarUrl,
        user_name: wx.getStorageSync("userInfo").nickName
      },

      success: res => {

        if (res.data = 10000) {
          this.setData({
            hasRegister: true
          })
          wx.setStorageSync('hasRegister', this.data.hasRegister)
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
      fail: (res) => {
        console.log(res)
      }
    })
  },

  onGotUserInfo(e) {
    this.setData({
      hasAuth: true
    })
    wx.getUserInfo({
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
    this.getSaveBtn();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('openid')) {
      // 登录
      wx.login({
        success: res => {
          var code = res.code;
          if (code) {
            wx.request({
              url: "https://www.bupt404.cn/login.php",
              data: {
                code: code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (e) {
                console.log(e)
                console.log(e.data)
                let openid = e.data[0]['openid']
                let session_key = e.data[0]['session_key']
                wx.setStorageSync('openid', openid);
                wx.setStorageSync('session_key', session_key)

              }
            })
            wx.getUserInfo({
              success: function (res) {
                userInfo
                wx.setStorageSync('userInfo', res.userInfo)
              }
            })
          } else {
            console.log('fail to get login !' + res.errMsg)
          }
        }
      })
    }

    //temp  above

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
          openid: wx.getStorageSync('openid')
        },
        header: {},
        success: (res) => {
          console.log(res)
          if (res.data.status == "10000") {
            wx.setStorageSync('hasRegister', true)
            this.setData({
              hasRegister: true
              // registerInfo: res.data.registerInfo
            })
          }
        },
        fail: (res) => {
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
    wx.stopPullDownRefresh()
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