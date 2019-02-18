/**
 * 微信小程序公共函数
 * @module
 * @author linj
 */
/**
 * @description 检查用户授权状态，UserInfo除外，将拿到的权限放在authSetting 中
 * @function
 * @param {string} argSet 要检查的权限
 * @returns {promise}
 */
export const checkSetting = (argSet) => {
  wx.removeStorage({ key: 'authSetting' })
  return new Promise(function(resolve, reject) {
    wx.getSetting({
      success(res) {
        wx.setStorageSync('authSetting', res.authSetting)
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
}

/**
 * @description 获取地理位置 (类型，)
 * @function
 * @param {string} argType 类型
 * @param {boolean} argAltitude 是否高精度
 * @returns {promise}
 */
export const getLocation = (argType = 'wgs84', argAltitude = false) => {
  let location = () => {
    return new Promise(function(resolve, reject) {
      wx.getLocation({
        altitude: argAltitude,
        type: argType,
        success: res => {
          console.log(res)
          return resolve(res)
        },
        fail: err => {
          return reject(err)
        }
      })
    })
  }
  let re = async() => {
    try {
      await checkSetting('userLocation')
      let re = await location()
      return re
    } catch (err) {
      if (err.errMsg) {
        wx.showToast({ title: '您已拒绝地理位置授权,可以在设置中重新打开', icon: 'none' })
      }
      return Promise.reject(err)
    }
  }
  return re()
}

/**
 * @description 回到顶部/某个位置
 * @function
 * @param {number} scrollTop 滚动距离
 * @param {number} duration 时间
 * @returns {promise}
 */
export const scrollTop = (scrollTop = 0, duration = 0) => {
  wx.pageScrollTo({
    scrollTop: scrollTop,
    duration: duration
  })
}

/**
 * @description toast默认为文字提示
 * @function
 * @param {string} argTitle title
 * @param {object} argOption toast 的option
 */
export const toast = (argTitle, argOption = { icon: 'none' }) => {
  Object.assign(argOption, {
    title: argTitle
  })
  wx.showToast(argOption)
}

/**
 * @function
 * @description 设置标题
 * @param  {} argTitle 标题
 */
export const setTitle = (argTitle) => {
  wx.setNavigationBarTitle({
    title: argTitle
  })
}

/**
 * @description obj转url参数
 * @function
 * @param {object} argParams 参数对象
 * @param {boolean} noMark 默认带?,true时,不带
 * @returns {string}
 */
export const setUrlParams = (argParams, noMark) => {
  let re = ''
  if (!noMark) {
    re = '?'
  }
  for (let k in argParams) {
    re += k + '=' + argParams[k] + '&'
  }
  if (argParams) {
    re = re.substring(0, re.length - 1)
  }
  return re
}

/**
 * @function
 * @description mpvue跳到特定页面
 * @param  {string} argPage 标题
 * @param  {object} argParams url参数
 * @param  {string} argType 跳转类型 switchTab reload redirectTo reLaunch navigateTo
 */
export const toPage = (argPage, argParams = {}, argType) => {
  console.log('page:', argPage, setUrlParams(argParams))
  if (!argPage || argPage === 'back') {
    wx.navigateBack({
      delta: argType || 1
    })
    return
  }
  if (argPage === 'index') {
    wx.reLaunch({
      url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
    })
    return
  }
  switch (argType) {
    case 'switchTab':
      wx.switchTab({
        url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
      })
      break
    case 'reload':
      wx.reLaunch({
        url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
      })
      break
    case 'redirectTo':
      wx.redirectTo({
        url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
      })
      break
    case 'reLaunch':
      wx.reLaunch({
        url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
      })
      break
    default:
      wx.navigateTo({
        url: '/pages/' + argPage + '/main' + setUrlParams(argParams)
      })
      break
  }
}

/**
 * @function
 * @description 当前页面数据obj
 */
export const currentPage = () => {
  var pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * @function
 * @description 获取当前页url
 * @param {boolean} argWithParams 是否附带参数
 */
export const getCurrentPageUrl = (argWithParams) => {
  var pages = getCurrentPages()
  var currentPage = pages[pages.length - 1]
  var url = currentPage.route
  var options = currentPage.options
  if (argWithParams) {
    url += this.urlParams(options)
  }
  return url
}

/**
 * @function
 * @description 判断微信授权登录状态，设置code
 * @returns {promise}
 */
export const needLogin = () => {
  return new Promise(function(resolve, reject) {
    let login = () => {
      return wx.login({
        timeout: 5000,
        success: function(rs) {
          console.info('login code:', rs.code)
          wx.setStorageSync('code', rs.code)
          return resolve(rs)
        },
        fail: function(err) {
          toast('请检查网络')
          return resolve(err)
        }
      })
    }
    wx.checkSession({
      timeout: 5000,
      success: rs => {
        // session_key 未过期，并且在本生命周期一直有效
        return reject(rs)
      },
      fail: err => {
        console.log(err)
        return login()
      }
    })
  })
}

/**
 * @function
 * @description 获取微信登录code
 * @returns {promise}
 */
export const login = () => {
  return new Promise(function(resolve, reject) {
    wx.login({
      timeout: 5000,
      success: function(rs) {
        wx.setStorageSync('code', rs.code)
        console.info('login info:', rs)
        return resolve(rs)
      },
      fail: function(err) {
        toast('请检查网络')
        return reject(err)
      }
    })
  })
}