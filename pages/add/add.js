// pages/add/add.js

const CAMERA_SIZE_MIN = 1 * 1024;
const CAMERA_SIZE_MAX = 10*1024*1024;
Page({
  data: {
      groupRange:['我要卖','我要买'],
      group:0,
      master:1,
      allowUpload:false,
      uploading:false,
      prgressColor:'#f44336',
      link:null,
      cred:null,
      file:[]
  },
  chsImg() {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePathTem = res.tempFilePaths[0];
        wx.getFileInfo({
          filePath: filePathTem,
          digestAlgorithm: 'sha1',
          success(res) {
            // console.log(res);
            let max = CAMERA_SIZE_MAX;
            let min = CAMERA_SIZE_MIN;
            if (that.data.file.find(function (x) {
              return x.hash === res.digest;
            })) {
              wx.showToast({
                title: '文件重复',
                icon: 'none'
              })
            }
            else if (!(res.size >= min && res.size <= max)) {
              wx.showToast({
                title: '文件大小不符合要求',
                icon: 'none'
              })
            } else {
              that.getCredentials(res.digest, function () {
                //console.log(that.cred);
                that.data.file.push({
                  path: filePathTem,
                  size: res.size,
                  hash: res.digest,
                  credentials: that.data.cred
                });
                that.setData({
                  file: that.data.file,
                });
                that.checkUpload();
              });
            }
          }
        });
      }
    })
  },

  pickGroup(e) {
    let raw = {
      group: e.detail.value,
    }
    if (e.detail.value == 0) {
      raw.file = [];
    }
    this.setData(raw);
  },

  rgbToHex(r, g, b) {
    var hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
  },

  uploadImg(currentValue, callback) {
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    this.setData({
      uploading: true,
      uploadPercent: 0
    });
    let that = this;
    let uploadTask = wx.uploadFile({
      url: 'https://upload-z1.qiniup.com',
      filePath: currentValue.path,
      name: 'file',
      formData: {
        key: currentValue.hash,
        token: currentValue.credentials
      },
      success: function (res) {
        // that.setData({
        //     uploadPercent: 100
        // });
        if (res.statusCode == 200) {
          callback(JSON.parse(res.data));
        } else {
          wx.showToast({
            title: '上传过程中发生了错误',
            icon: 'none',
            duration: 1500
          })
          console.log(JSON.parse(res.data))
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none',
          duration: 1500
        })
        console.log(JSON.parse(res.data))
      },
      complete: function (res) {
        wx.hideLoading();
      }
    });
    uploadTask.onProgressUpdate((res) => {
      let p = res.progress;
      let r = 255, g = 255;
      if (p >= 50) {
        r = Math.round(244 * (1.0 - (p / 100)));
      } else {
        g = Math.round(66 + 188 * p / 100);
      }
      that.setData({
        uploadPercent: res.progress,
        progressColor: that.rgbToHex(r, g, 50)
      });

    })
  },


  bindinput(e) {
    switch (e.target.id) {
      case "title":
        this.setData({
          title: e.detail.value
        })
        break;
      case "link":
        this.setData({
          link: e.detail.value
        })

    }
    this.checkUpload();
  },
  checkUpload() {
    if (((this.data.group == 1 && this.data.file.length >= 2) || (this.data.group == 0 && this.data.file.length == 1)) && this.data.title) {
      this.setData({
        allowUpload: true
      })
    } else {
      this.setData({
        allowUpload: false
      })
    }
  },

  upload(e) {
    let that = this;
    let masterUploadID = null;
    this.data.file.forEach(function (currentValue, index, array) {
      let masterTitle = that.data.title;
      let masterIntro = that.data.intro;
      let master = that.data.master;
      that.uploadImg(currentValue, (data) => {
        console.log(data);
        let dataRaw = null;
        if (index == 0) {
          masterUploadID = data.data.upload_id;
          dataRaw = {
            upload_key: data.data.upload_key,
            upload_id: data.data.upload_id,
            title: masterTitle,
            master: master
          };
        } else {
          dataRaw = {
            upload_key: data.data.upload_key,
            upload_id: data.data.upload_id,
            title: masterTitle,
            master: master / 10,
            //tx_url: masteUploadID
          }
        }
        wrapper.request({
          url: "/siceapp/bpc/upload_content",
          data: dataRaw,
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: res => {
            that.setData({
              uploading: false
            });
            if (res.data.status && (index + 1 == array.length)) {
              wrapper.uploadFormId(e.detail.formId);
              wx.showToast({
                title: '上传成功，请等待审核',
                icon: 'none',
                mask: true,
                duration: 2000,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack();
                  }, 1000)
                }
              });
            }
          }
        })
      })
    });
  },

  onLoad: function (options) {

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