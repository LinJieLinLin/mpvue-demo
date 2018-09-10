<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  }
  // onShow() {}
}
</script>

<style lang="scss">
@import './asset/css/index.scss';
page {
  transition: width 2s;
}
</style>
