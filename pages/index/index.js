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
    tag1: [{ "subject": "信号与系统", "mark": "9","show":true }, { "subject": "大学英语","show":false}],
    tag2:["beautiful","kind"],
    subject: "",
    demand: "",
    registerInfo: null
  },
  saveDate(e) {
    wx.request({
      url: 'https://www.bupt404.cn/helper/order.php',
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
      case "subject":
        this.setData({
          subject: e.detail.value
        })

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
  addTag(e) {
    let that = this;
    //console.log(e.target.id)
    switch (e.target.id) {
      case 'addSubject':
        if (that.data.subject == "") {
          wx.showToast({
            title: '请输入合法学科',
            icon: "loading"
          })
          return
        }
        else if (that.data.tag1.length >= 5) {
          wx.showToast({
            title: '科目超出合法数量',
            icon: "loading"
          })
          return
        }
        let show=true
        wx.request({

        })
        let idx1 = that.data.tag1.length
        let obj={}
        obj.subject = that.data.subject
        obj.show=show
        that.data.tag1.push(obj);
        that.setData({
          tag1: that.data.tag1,
          subject: ""
        })
        console.log(that.data.tag1)
        break;
      case "addDemand":
        if (that.data.demand == "") {
          wx.showToast({
            title: '请输入合法学科',
            icon: "loading"
          })
          return
        }
        let idx2 = that.data.tag2.length
        that.data.tag2[idx2] = that.data.demand
        that.setData({
          tag2: that.data.tag2,
          demand: ""
        })
        break;
    }
  },
  removeTag(e) {
    var idx = e.currentTarget.dataset.num
    var that=this
    switch (e.target.id) {

      case 'retag1':
        var tag1 = that.data.tag1
        tag1.splice(idx, 1)
        that.setData({
          tag1: tag1
        })
        break;
      case 'retag2':
        var tag2 = that.data.tag2
        tag2.splice(idx, 1)
        //  console.log(tag)
        that.setData({
          tag2: tag2
        })
      break;
      default:
      break;

    }
  },
  showMark(e){

    let idx = e.currentTarget.dataset.idx
    let temp=!this.data.tag1[idx].show
    let tag1 = 'tag1[' + idx + '].show'
    this.setData({
      [tag1]: temp
    })
  },

  sliderChange(e){
    console.log(e)
    let idx=e.currentTarget.dataset.idx
    let tag1='tag1[' + idx + '].mark'
    this.setData({
      [tag1]:e.detail.value
    })
  },
  saveInfo() {
    wx.request({
      url: "https://www.bupt404.cn/helper/postinfo.php",
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
  onLoad: function (options) {

    if (!wx.getStorageSync('userInfo') || !wx.getStorageSync('openid')) {
      // 登录
      wx.login({
        success: res => {
          var code = res.code;
          if (code) {
            wx.request({
              url: "https://www.bupt404.cn/helper/login.php",
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

    wx.request({
      url: 'https://www.bupt404.cn/helper/redpoint.php',
      header: {},
      method: "GET",
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: (res) => {
        //console.log(res.data)
        if (res) {
          app.globalData.isunread = true
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })

    //formatTime
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
        url: 'https://www.bupt404.cn/helper/checkregister.php',
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
    wx.stopPullDownRefresh()
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