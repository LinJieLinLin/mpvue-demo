<template>
  <div class="mg-f20">
    云函数测试
    <button @click="sum">sum</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      logs: []
    }
  },
  methods: {
    sum() {
      wx.cloud.callFunction({
        name: 'login',
        data: {
          a: 1,
          b: 2
        }
      }).then(res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res.result)
      }).catch(err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      })
    }
  },
  mounted() {
    // 挂载
  },
  onShow() {
    // 活动时
  }
}
</script>

<style scope lang="scss">
</style>
