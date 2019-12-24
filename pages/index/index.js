//index.js
//获取应用实例
const app = getApp()
import {http} from "../../utils/request.js"

Page({
  data: {
    motto: 'Hello World11',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperObj: {
      isShow: true,//是否显示圆点
      autoPlay: true,//自动轮播
      interval: 3000,//自动切换时间
      duration: 500,//滑动时长
      circular: true,//loop
    },
    height: [],//高度
    curHeight: 0,
    swiperAry: [
      'https://oss-free.xuantong.cn/picturePath/94f398e54a4946a209774dbed972cf02.jpg',
      'https://oss-free.xuantong.cn/picturePath/94f398e54a4946a209774dbed972cf02.jpg',
      'https://oss-free.xuantong.cn/picturePath/94f398e54a4946a209774dbed972cf02.jpg'
    ]
  },
  created(){
    // this.getTabBar()
  },
  onShow(){
    console.log('onShow')
    console.log(this.getTabBar(), 'tabBar')
    this.getTabBar().setData({
      selected:0
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady:function(){
    http.post("/article/list", { "pageIndex": 1, "columnId": "2"})
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //图片加载完成后计算高度
  imgLoad(e) {
    // console.log(wx.getSystemInfoSync().windowWidth)//获取屏宽
    let h = wx.getSystemInfoSync().windowWidth * e.detail.height / e.detail.width
    // let imgHeight=e.detail.height
    // console.log(height)
    let height = this.data.height
    height[e.target.dataset.index] = h
    this.setData({
      height: height
    })
    if (e.target.dataset.index == 0) {
      this.setData({
        curHeight: height[0]
      })
    }
  },
  //swiper切换
  swiperChange(e) {
    let height = this.data.height
    this.setData({
      curHeight: height[e.detail.currentItemId]
    })
  }

})
