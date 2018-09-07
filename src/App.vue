<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  },
  onTabItemTap(item) {
    console.log(123321)
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
}
</script>

<style lang>
@import './asset/css/index.scss';
page {
  transition: width 2s;
}
</style>
