import Vue from 'vue'
import App from './App'
import store from './store/index'
import f from './utils'
wx.cloud.init({
  traceUser: true
})

//  vuex
Vue.prototype.$store = store
Vue.prototype.f = f
Vue.config.productionTip = false
App.mpType = 'app'

// Vue.prototype.$http = fly
const app = new Vue(App)
app.$mount()
Vue.prototype.G = getApp().globalData

// dev 使用
getApp().globalData.Vue = app