const matations = {
    /**
     * state:当前状态树
     * d: 提交matations时传的参数
     */
    getOpenId(state, d) {
        state.openId = d
    },
    increment: (state) => {
        const obj = state
        obj.count += 1
    },
    decrement: (state) => {
        const obj = state
        obj.count -= 1
    },
    // 获取用户信息
    getUserInfo(state, rs) {
        if (!rs) {
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            console.log(res)
                            state.userInfo = res.userInfo
                        }
                    })
                }
            })
        } else {
            console.log(this)
            console.log(rs)
            state.userInfo = rs.target.userInfo
        }
        // 调用登录接口
    },
}

export default matations