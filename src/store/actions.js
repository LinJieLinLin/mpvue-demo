import { TestGet, TestPost } from '@/api/test'
import { getUserInfo } from '@/utils/wx.js'
const actions = {
  async TestGet({ commit }, param = {}) {
    const _result = await TestGet(param).catch(err => {
      return Promise.reject(err)
    })
    return _result
  },
  async TestPost({ commit }, param = {}) {
    const _result = await TestPost(param).catch(err => {
      console.log(err)
    })
    return _result
  },
  async GetUserInfo({ commit }, rs) {
    const _result = await getUserInfo(rs).catch(err => {
      console.log(err)
    })
    console.log(_result.userInfo)
    commit('SetUserInfo', _result.userInfo)
    return _result
  }
}
export default actions
