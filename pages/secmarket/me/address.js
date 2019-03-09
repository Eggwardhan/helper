var app = getApp();
var address = {
  "code": 200,
  "requestId": "xxx",
  "data": [
    {
      recipient: "小ｓ",
      telephone: 12233445566,
      province: "北京",
      city: "北京市",
      area: "海淀区",
      address: "知春路",
      isDefault: 0
    },
    {
      recipient: "小li",
      telephone: 12233445566,
      province: "北京",
      city: "北京市",
      area: "昌平区",
      address: "沙河高教",
      isDefault: 1
    },
    {
      recipient: "小zh",
      telephone: 12233445566,
      province: "北京",
      city: "北京市",
      area: "海淀区",
      address: "西土城",
      isDefault: 0
    }
  ],
  "success": true,
  "message": "success"
}
Page({
  data: {},
  onLoad: function () {
 console.log("success nav to address")
  },
  onShow: function () {
    var that = this,
      data = address.data;
    that.setData({
      address: data
    })
  },
  setDefault: function (e) {
    var that = this,
      bindVal = e.currentTarget.dataset.value.index;
  },
  delAddr: function (e) {
    var id = e.currentTarget.dataset.id;
  },
  editAddr: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "editAddr?id=" + id,
      success: function (res) {
      },
    })
  },

  addAddr: function () {
    wx.navigateTo({
      url: "editAddr",
      success: function (res) {
      },
    })
  }

})