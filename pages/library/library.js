// pages/library/library.js
const app = getApp()
import {
  http
} from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],//所有数据
    dataLeft: [], //左侧
    dataRight: [], //右侧
    page: 1,
    minHeight: 80, //图片的最小高度
    isShow:false,
    text:"加载更多"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(this.data.page)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTabBar().setData({
      selected: 2
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /* 
  获取数据
  */
  getData(page = 1,kind) {
    http.post("/production/list", {
      pageIndex: page
    }).then(res => {
      if (res.code == 0) {
        console.log(res)
        this.fillData(res.result.productionResponseVos)
        this.setData({
          data: this.data.data.concat(res.result.productionResponseVos)
        })
        if(kind=='down'){
          wx.stopPullDownRefresh()
        }else if(kind=='more'){
          //加载更多
          if (res.result.productionResponseVos.length<=0){
            this.setData({
              text:"没有更多啦~"
            })
          }else{
            this.setData({
              text: "加载更多"
            })
          }
        }
        
      }
    })
  },
  /* 
    计算高度 填充数据
   */
  fillData(ary) {
    var aryLeft = this.data.dataLeft
    var aryRight = this.data.dataRight
    var W = wx.getSystemInfoSync().windowWidth * 0.48 //屏宽
    var minHeight = this.data.minHeight
    ary.forEach((item) => {
      var H1 = 0,
        H2 = 0;
      aryLeft.forEach(ite => {
        if (W * ite.productionLong / ite.productionWidth <= minHeight) {
          H1 += minHeight
        } else {
          H1 += W * ite.productionLong / ite.productionWidth
        }
      })
      aryRight.forEach(ite => {
        if (W * ite.productionLong / ite.productionWidth <= minHeight) {
          H2 += minHeight
        } else {
          H2 += W * ite.productionLong / ite.productionWidth
        }
      })
      console.log(H2, H1)
      if (H2 >= H1) {
        aryLeft.push({ ...item,
          currentHeight: W * item.productionLong / item.productionWidth > minHeight ? W * item.productionLong / item.productionWidth : minHeight
        })
      } else {
        aryRight.push({ ...item,
          currentHeight: W * item.productionLong / item.productionWidth > minHeight ? W * item.productionLong / item.productionWidth : minHeight
        })
      }
    })
    console.log(aryLeft, aryRight)
    this.setData({
      dataLeft: aryLeft,
      dataRight: aryRight
    })
  },

  /* 
    查看大图
   */
  lookView(e){
    console.log(e.currentTarget.dataset)
    var imgAry = e.currentTarget.dataset.imgary.map(item => item.pictureUrl)
    wx.previewImage({
      current: this.data.data,     //当前图片地址
      urls: [e.currentTarget.dataset.url],               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('下拉')
    this.setData({
      dataLeft: [], //左侧
      dataRight: [], //右侧
      text:"加载更多",
      page:1,
    })
    this.getData(this.data.page,'down')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('触底')
    if(this.data.text=='加载更多'){
      this.setData({
        text: "加载中...",
        page: this.data.page+1
      })
      setTimeout(()=>{
        this.getData(this.data.page, 'more')
      },500)
    }
   
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    this.setData({
      isShow:true
    })
  }
})