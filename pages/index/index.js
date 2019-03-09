// pages/index/index.js
var app=getApp();
Page({
  data: {
    hasAuth :false,
    hasRegister:false,
    schoolDepartmentList:['信通','计院','邮政','软工','国院','电子','理学院','经管','人文','网安'],
    departmentIndex: 0,
    gender:'男',
    schoolDepartment:'信通',
    genderList:['男','女'],
    genderIndex:0
  },
  bindinput(e){
    let reg;
    let that=this;
    switch(e.target.id){
      
      case 'name':
        this.setData({
          name:e.detail.value
        });
        reg=/^[\u4e00-\u9fa5]+$/;
        if(reg.test(e.detail.value)){
          this.setData({
            nameWarn:false
          })
          }else{
            this.setData({
              nameWarn:true
            })
          }
          break;
      case "schoolId":
        this.setData({
          schoolId:e.detail.value
        });
        reg=/^\d{10}$/;
        if(reg.test(e.detail.value)){
          this.setData({
            schoolIdWarn:false
          })
          }else{
            this.setData({
              schoolIdWarn:true
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
            phoneWarn:false
          })
        } else {
          this.setData({
            phoneWarn:true
          })
        }
        break;
      case "schoolDepartment":
        this.setData({
          schoolDepartment: that.data.schoolDepartmentList[e.detail.value],
          departmentIndex:e.detail.value
        });
        break;
      case "gender":
        this.setData({
          gender: that.data.genderList[e.detail.value],
          genderIndex: e.detail.value
        });
        break;

        }    
     this.getSaveBtn() ;
  },

  getSaveBtn() {
    if (this.data.name && this.data.schoolId && this.data.phone &&this.data.hasAuth&&
      !this.data.nameWarn && !this.data.schoolIdWarn && !this.data.phoneWarn){
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
    wrapper.request({
      url: "yjw404.cn/",
      data: {
        name: this.data.name,
        school_id: this.data.schoolId,
        phone_number: this.data.phone,
        department: this.data.schoolDepartment,
        gender:this.data.gender
      },
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data.status) {
          wx.showToast({
            title: '认证成功，请清空缓存后重新进入小程序',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 1500)
            }
          })
          /*wx.redirectTo({
            url: "/pages/index/index"
          })*/
        }
      }
    })
  },

  onGotUserInfo(e) {
    this.setData({
      hasAuth: true
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({
              hasAuth :true
            })
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                console.log(res.userInfo);

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
      console.log(app.globalData.hasAuth)

      this.setData({
        hasAuth: app.globalData.hasAuth,
        hasRegister: app.globalData.hasRegister
      })
      console.log(this.data.hasAuth)
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