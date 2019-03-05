<template>
  <div class="pd-x20">
    <button class=" " type="primary" open-type="getUserInfo" @getuserinfo="checkUserInfo">确认登录</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      logs: []
    }
  },
  computed: {
    ...mapState(['UserInfo'])
  },
  methods: {
    ...mapActions(['GetUserInfo']),
    checkUserInfo(rs) {
      this.GetUserInfo(rs).then(res => {
        console.log('登录操作 todo', res)
        this.f.toPage()
      }, err => {
        console.log(err)
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
