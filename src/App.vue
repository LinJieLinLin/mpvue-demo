<script>
import { checkSetting, login, checkUpdate, sleep } from './utils/wx.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['UserInfo'])
  },
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  },
  onShow() {
    console.log('app', this.UserInfo)
    sleep(5).then(() => {
      checkUpdate()
    })
    if (!this.UserInfo || !this.UserInfo.nickName) {
      console.log('用户信息丢失，重新获取')
      this.f.toPage('login')
    } else {
      checkSetting('userInfo').then(res => {
        console.log(res)
      }, err => {
        console.log(err)
        this.f.toPage('login')
      })
    }
  }
}
</script>

<style lang="scss">
@import "./scss/settings.scss";
@import "./scss/base.scss";
</style>
