const matations = {
  /**
   * @description 获取用户信息
   * @param {object} rs 用户信息
   */
  SetUserInfo(state, rs) {
    Object.assign(state.UserInfo, rs.userInfo)
    state.UserInfo.encryptedData = rs.encryptedData
    state.UserInfo.iv = rs.iv
    state.UserInfo.signature = rs.signature
    state.UserInfo.encryptedData = rs.encryptedData
    state.UserInfo.code = rs.code
  }
}

export default matations
