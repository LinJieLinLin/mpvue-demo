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
    }
}

export default matations