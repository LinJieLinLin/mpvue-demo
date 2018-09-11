import Vue from 'vue'
import App from './App'
import store from './store/index'
import CommonFunction from './utils/index'
//  vuex
Vue.prototype.$store = store
Vue.prototype.f = CommonFunction
Vue.config.productionTip = false
App.mpType = 'app'

// flyio
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
Vue.prototype.$http = fly
const app = new Vue(App)
app.$mount()
Vue.prototype.G = getApp().globalData

// dev 使用
getApp().globalData.Vue = app

// 默认5s超时
fly.config.timeout = 5000
fly.config.baseURL = 'http://yapi.demo.qunar.com'

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    // 给所有请求添加自定义header
    request.headers['X-Tag'] = 'x-tag'

    // 判断登录
    CommonFunction.needLogin(app).then(
        rs => {
            app.G.code = rs.code
            CommonFunction.toPage('login')
        },
        err => {
            // 已登录
            console.log('已登录', err)
        }
    )

    // 打印出请求
    console.log(request)

    // 添加token todo

    // 处理loading todo

    return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        // 只将请求结果的data字段返回
        return response.data
    },
    err => {
        // 错误处理
        console.log(err)

        // 超时处理
        if (err.message.match('timeout')) {
            console.log(err.message)
        }
        switch (err.errcode) {
            case 404:
                console.log(err.errcode)
                break
        }
        // 发生网络错误后reject
        return Promise.reject(err)
    }
)