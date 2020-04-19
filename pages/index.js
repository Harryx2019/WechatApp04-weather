// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市','北京市','东城区'],
    now: ''
  },

  getLocation(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.chooseLocation({
          success: function (res) {
            var address = res.address;
            var newRegion = new Array();
            var province = address.split("省");
            newRegion[0] = province[0] + '省';

            var city = province[1].split("市");
            newRegion[1] = city[0] + '市';

            var area = city[1].split("区");
            newRegion[2] = area[0] + '区';

            that.setData({
              region: newRegion
            });
            that.getWeather();
            }
          })
      },
      fail: function (res) { 
        console.log(res);
      },
      complete: function (res) { },
    })
  },
  changeRegion : function(e){
    this.setData({
      region: e.detail.value
    })
    this.getWeather();//更新天气
    console.log(this.data.now);
  },

  getWeather: function(){
    let that=this; //this不可以直接在wxAPI函数内部使用
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: that.data.region[1],
        key: '5bc9c69fd43145eaa55735df36e0cc4f'
      },
      success : function(res){
        that.setData({
          now: res.data.HeWeather6[0].now
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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