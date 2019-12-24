const baseUrl = "https://cr-api-uat.xuantong.cn" //基本url

const ajax = ({
  url,
  data,
  header = { "Content-Type": "application/json"},
  method,
  dataType='json',
  responseType='text'
}) => {
  return new Promise((resolve, reject) => {
    console.log(dataType,'url11')
    wx.request({
      url: baseUrl + url, //请求地址
      data: data, //请求参数
      header: header,
      method, //请求方式
      dataType: dataType ,
      responseType: responseType,
      success: function(res) {
        //接口访问正常返回数据
        if(res.statusCode==200){
          resolve(res.data)
        }
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}


const http = {
  get: function(url,data,params) {
    return ajax({ 
      url,
      data,
      ...params,
      method: 'GET'
    })
  },
  post: function(url,data,params) {
   return ajax({ 
      url,
      data,
      ...params,
      method: 'POST'
    })
  },
}

module.exports = {
  http: http
}