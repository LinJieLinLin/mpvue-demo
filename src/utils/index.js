let CommonFunction = {
    // 检查用户授权状态，userinfo无效
    checkSetting(argG, argSet) {
        return new Promise(function(resolve, reject) {
            wx.getSetting({
                success(res) {
                    argG.authSetting = res.authSetting
                    if (!res.authSetting['scope.' + argSet]) {
                        wx.authorize({
                            scope: 'scope.' + argSet,
                            success(rs) {
                                return resolve(rs)
                            },
                            fail(err) {
                                return reject(err)
                            }
                        })
                    } else {
                        return resolve(res)
                    }
                },
                fail(err) {
                    return reject(err)
                }
            })
        })
    },
    // 获取地理位置 (this.g,类型，是否高精度)
    getLocation(argG, argType = 'wgs84', argAltitude = false) {
        let location = () => {
            return new Promise(function(resolve, reject) {
                wx.getLocation({
                    altitude: argAltitude,
                    type: argType,
                    success: function(res) {
                        console.log(res)
                        return resolve(res)
                    }
                })
            })
        }
        let re = async() => {
            try {
                // await this.checkSetting(argG, 'userLocation').catch(err => {
                //     // 不走外层catch
                //     console.log('单独的错误处理', err)
                // })
                await this.checkSetting(argG, 'userLocation')
                let re = await location()
                return Promise.resolve(re)
            } catch (err) {
                if (err.errMsg) {
                    this.toast('您已拒绝地理位置授权,可以在设置中重新打开')
                }
                return Promise.reject(err)
            }
        }
        return re()
    },
    // 回到顶部
    scrollTop(scrollTop = 0, duration = 0) {
        wx.pageScrollTo({
            scrollTop: scrollTop,
            duration: duration
        })
    },
    // toast
    toast(argTitle, argOption = { icon: 'none' }) {
        Object.assign(argOption, {
            title: argTitle
        })
        wx.showToast(argOption)
    },
    // 设置标题
    setTitle(argTitle) {
        wx.setNavigationBarTitle({
            title: argTitle
        })
    },
    // 判断登录状态
    needLogin() {
        return new Promise(function(resolve, reject) {
            let login = () => {
                return wx.login({
                    timeout: 5000,
                    success: function(rs) {
                        // session_key 未过期，并且在本生命周期一直有效
                        console.info('login info:', rs)
                        return resolve(rs)
                    },
                    fail: function(err) {
                        // 重新登录
                        return reject(err)
                    }
                })
            }
            wx.checkSession({
                timeout: 5000,
                success: rs => {
                    // 处理未有用户信息
                    if (!wx.getStorageSync('login')) {
                        return login()
                    } else {
                        return reject(rs)
                    }
                },
                fail: err => {
                    console.log(err)
                    return login()
                }
            })
        })
    },
    // 登录
    login() {
        // 重新登录
        return new Promise(function(resolve, reject) {
            wx.login({
                timeout: 5000,
                success: function(rs) {
                    // session_key 未过期，并且在本生命周期一直有效
                    console.info('login info:', rs)
                    return resolve(rs)
                },
                fail: function(err) {
                    // 重新登录
                    // session_key 已经失效，需要重新执行登录流程
                    console.log(err)
                    wx.login()
                    return reject(err)
                }
            })
        })
    },
    // 当前页面数据
    currentPage() {
        var pages = getCurrentPages()
        return pages[pages.length - 1]
    },
    // 获取当前页url argWithParams：是否附带参数
    getCurrentPageUrl(argWithParams) {
        var pages = getCurrentPages()
        var currentPage = pages[pages.length - 1]
        var url = currentPage.route
        var options = currentPage.options
        if (argWithParams) {
            url += this.urlParams(options)
        }
        return url
    },
    // obj转url参数
    urlParams(argParams) {
        let re = '?'
        for (let k in argParams) {
            re += k + '=' + argParams[k] + '&'
        }
        if (argParams) {
            re = re.substring(0, re.length - 1)
        }
        return re
    },
    // 跳到页面
    toPage(argPage, argParams = {}, argType) {
        if (!argPage || argPage === 'back') {
            wx.navigateBack({
                delta: argType || 1
            })
            return
        }
        switch (argType) {
            case 'switchTab':
                wx.switchTab({
                    url: '/pages/' + argPage + '/main' + this.urlParams(argParams)
                })
                break
            case 'reload':
                wx.reLaunch({
                    url: '/pages/' + argPage + '/main' + this.urlParams(argParams)
                })
                break
            case 'redirectTo':
                wx.redirectTo({
                    url: '/pages/' + argPage + '/main' + this.urlParams(argParams)
                })
                break
            case 'reLaunch':
                wx.reLaunch({
                    url: '/pages/' + argPage + '/main' + this.urlParams(argParams)
                })
                break
            default:
                wx.navigateTo({
                    url: '/pages/' + argPage + '/main' + this.urlParams(argParams)
                })
                break
        }
    },
    // 年月日 时分秒显示
    formatTime: (date) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        const t1 = [year, month, day].map(key => {
            const str = key.toString()
            return str[1] ? str : `0${str}`
        }).join('/')
        const t2 = [hour, minute, second].map(key => {
            const str = key.toString()
            return str[1] ? str : `0${str}`
        }).join(':')
        return `${t1} ${t2}`
    }
}
export default CommonFunction