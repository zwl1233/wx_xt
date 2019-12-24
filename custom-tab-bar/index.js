const app=getApp()
Component({
  data: {
    selected: null,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "/image/shouye2.png",
        selectedIconPath: "/image/shouye.png",
        text: "首页"
      }, {
        pagePath: "/pages/classList/classList",
        iconPath: "/image/kecheng2.png",
        selectedIconPath: "/image/kecheng.png",
        text: "去上课"
      },
      {
        pagePath: "/pages/library/library",
        iconPath: "/image/shangdian2.png",
        selectedIconPath: "/image/shangdian.png",
        text: "暄桐文房"
      }, {
        pagePath: "/pages/mySelf/mySelf",
        iconPath: "/image/wode2.png",
        selectedIconPath: "/image/wode.png",
        text: "我的"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const that=this
      console.log(data.path)
      wx.switchTab({
        url,
      })
     
    }
  }
})