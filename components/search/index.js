// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindfocus(e){
      // console.log(e,'输入框得焦时触发')
      wx.navigateTo({
        url: '../../pages/search/search?flag=true'
      })
    }
  }
})
