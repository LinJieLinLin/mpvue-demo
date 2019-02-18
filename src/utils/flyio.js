import { needLogin, toPage, toast } from './wx'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
  // 默认5s超时
fly.config.timeout = 5000
fly.config.baseURL = 'http://yapi.demo.qunar.com/mock/9343'
const suCode = ',0,'
let requestNum = 0
let timmer = null
let temTime = null
let temStartTime = null

/**
 * @description loading处理
 * @function
 * @param {boolean} isAdd 是否增加请求数
 * @returns {string}
 */
export const loading = (isAdd) => {
  if (isAdd) {
    if (!requestNum) {
      temTime = +new Date()
      timmer = setTimeout(function() {
        temStartTime = +new Date()
        console.info('显示loading用时：', temStartTime - temTime)
        wx.showLoading({})
      }, 300)
    }
    requestNum++
  } else {
    requestNum--
  }
  console.log(requestNum)
  if (!requestNum) {
    clearTimeout(timmer)
    setTimeout(function() {
      wx.hideLoading()
      if (temStartTime) {
        console.info('显示loading时长：', +new Date() - temStartTime)
      }
    }, 300)
  }
}

// console.log('环境变量：', process.env)
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  loading(1)
    // 判断登录
  needLogin().then(
    rs => {
      loading()
      if (getApp && getApp().globalData) {
        getApp().globalData.code = rs.code
      }
      console.log(rs.code)
      toPage('login')
    },
    err => {
      // 已登录
      console.log('已登录', err)
    }
  )

  // 给所有请求添加自定义header
  // request.headers['X-Tag'] = 'flyio'
  // 打印出请求体
  console.log('请求拦截', request)
    // 终止请求
    // var err=new Error("xxx")
    // err.request=request
    // return Promise.reject(new Error(""))
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (res) => {
    loading()

    console.log('响应拦截:', res)
      // const data = JSON.parse(res.data)
    const data = res.data
    if (suCode.match(',' + data.code + ',')) {
      return data.data
    }
    // 其它异常
    switch (data.code) {
      case 4:
        console.log('请授权登录', data.data.url)
        return Promise.reject(data.data)
      default:
        return Promise.reject(data.data)
    }
  },
  (err) => {
    loading()

    // 发生网络错误后会走到这里
    console.log('http err:', err)
      // 超时处理
    if (err && err.message && err.message.match('timeout')) {
      console.log(err.message)
      toast('请求超时！')
      return Promise.reject(err)
    }
    // 状态码判断
    switch (err.status) {
      case 404:
        toast('请求失败,请重试')
        break
      case 500:
        toast('服务器错误,请重试')
        break
    }
    // 发生网络错误后reject
    return Promise.reject(err)
  }
)
export const post = (argData) => {
  if (!argData) {
    return
  }
  return fly.request(argData.url, argData.params, {
    method: 'post',
    config: argData.config
  })
}
export const get = (argData) => {
  if (!argData) {
    return
  }
  return fly.request(argData.url, argData.params, {
    method: 'get',
    config: argData.config
  })
}
export const request = (argData) => {
  if (!argData) {
    return
  }
  return fly.request(argData.url, argData.params, {
    method: argData.method,
    config: argData.config
  })
}
export default fly