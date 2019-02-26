// inedx2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAuth:wx.canIUse('button.open-type.getUserInfo'),
    grids: [0, 1, 2, 3, 4, 5,],
    indicatorDots : true,
     autoplay:"" ,
    interval:"",
    duration:"",
    imgUrls:"",
    goodsList:[
      { goodsImg:"/resources/subnav_05.png",
      goodsName:"awsl",
      Price:"99",
      tagline:'descriptionssss',}
    ],
    inputShowed: false,
    inputVal: "",
    searchbar:false
  },
  //search
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },/////search 

  onGotUserInfo(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
   this.setData({
     hasAuth:true
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:function(res){
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){
              console.log(res.userInfo)
            }
          })
          }
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