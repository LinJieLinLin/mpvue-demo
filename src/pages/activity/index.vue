<template>
  <div>
    文明活动
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      logs: []
    }
  },

  created() {},
  onShow() {
    // wx.switchTab({
    //   url: '/pages/index/main'
    // })
  },
  onTabItemTap(item) {
    wx.showToast({
      title: 'tab点击'
    })
    console.log(item)
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
