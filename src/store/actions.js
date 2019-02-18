import { TestGet, TestPost } from '@/api/test'
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
}
export default actions