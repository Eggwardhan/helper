Page({

  data: {
    allowSave:true,
    schoolDepartmentList: ['信息与通信工程学院', '计算机学院', '自动化学院', '软件学院', '数字媒体与设计艺术学院', '现代邮政学院', '继续教育学院', '国际学院', '网络教育学院', '电子工程学院', '理学院', '经济管理学院', '公共管理学院', '人文学院', '马克思主义学院', '网络空间安全学院', '光电信息学院', '民族教育学院', '网络技术研究院', '叶培大创新学院'],
    departmentIndex: 0,
    gender: '男',
    schoolDepartment: '信息与通信工程学院',
    genderList: ['男', '女'],
    genderIndex: 0,
    user_intro: "",
    registerInfo: null,
    phone:null,
    realname:null,
    schoolid:null,
    user_intro:""
  },
  bindinput(e) {
    let reg;
    let that = this;
    switch (e.target.id) {

      case 'realname':
        this.setData({
          realname: e.detail.value
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
      case "user_intro":
        var len = parseInt(e.detail.value.length)
        this.setData({
          user_intro: e.detail.value,
          wordNum: len
        })
        break;
      case "schoolid":
        this.setData({
          schoolid: e.detail.value
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
    }
    this.getSaveBtn();
  },
  getSaveBtn() {

    if (this.data.realname && this.data.schoolid && this.data.phone &&
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
  changeInfo(){
      wx.request({
        url: 'https://www.bupt404.cn/postinfo.php',
        method:"POST",
        header: {
          "ContentType": "application/x-www-form-urlencoded"},
        data:{
          openid:wx.getStorageSync('openid'),
          realname: this.data.name,
          schoolid: this.data.schoolId,
          phone: this.data.phone,
          schoolDepartment: this.data.schoolDepartment,
          gender: this.data.gender,
          avatarUrl: wx.getStorageSync("userinfo").avatarUrl,
          user_name: wx.getStorageSync("userinfo").nickName,
          user_intro:this.data.user_intro
          },
          success:(res)=>{
            console.log(res)
            if (res.data = 10000) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1500,
                success: () => {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/pages/me/me',
                    });
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
  onLoad: function (options) {
   // console.log(wx.getStorageSync('userInfo').avatarUrl);
 //   let userOb=wx.getStorageSync('userInfo');
   // console.log(userOb.avatarUrl)
    wx.request({
      url: 'https://www.bupt404.cn/getinfo.php',
      header: { "Content-Type": "json" },
      method: "GET",
      data: { openid: wx.getStorageSync('openid') },
      success: (res) => {
        console.log(res)
        this.setData({
          phone: res.data.phone,
          realname: res.data.realname,
          schoolid: res.data.schoolid,
          user_intro: res.data.user_intro,
          schoolDepartment: res.data.schoolDepartment,
          gender: res.data.gender

        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})