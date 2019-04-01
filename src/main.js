import Vue from 'vue'
import App from './App'
import store from './store/index'
import { toPage, toast, setRequest } from './utils/wx'
import { formatTime, safeData, getRegexp } from './utils/j'

const baseUrl = 'http://localhost:7001'
//  vuex
Vue.prototype.$store = store
Vue.prototype.f = {
  toPage: toPage,
  formatTime: formatTime,
  safeData: safeData,
  toast: toast
}
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.G = getApp().globalData
// 请求拦截
const request = argData => {
  console.log('请求参数：', argData.url, getRegexp().http.test(argData.url))
  if (!getRegexp().http.test(argData.url)) {
    // baseUrl
    argData.url = baseUrl + argData.url
  }
  return argData
}
// 响应拦截
const response = argData => {
  console.log('响应参数：', argData)
  return argData
}
setRequest(request, response)
// dev 使用
getApp().globalData.Vue = app
