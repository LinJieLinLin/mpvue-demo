<template>
  <div class="pd-x20">
    <button class=" " type="primary" open-type="getUserInfo" @getuserinfo="checkUserInfo">确认登录</button>
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
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['getUserInfo']),
    checkUserInfo(rs) {
      console.log('checkUserInfo')
      this.getUserInfo(rs)
      if (!this.userInfo) {
      } else {
        wx.setStorageSync('login', true)
        this.f.toPage()
      }
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
