<template>
  <div>
    <div class="userinfo">
      <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="nickname">
        {{userInfo.nickName}}
      </div>
    </div>
    <div @click="t">12331</div>
    <button class="" type="primary" open-type="openSetting" @click="openSetting()">授权设置</button>
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
    t() {
      console.log(123)
      console.log(this.$store.getters)
      this.$store.state.count = 100
    },
    openSetting(rs) {
      console.log(rs)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  onShow() {
    console.log('onShow')
  },
  mounted() {
    console.log('mounted')
    this.f.getLocation(this.G).then(rs => {
      console.log(rs, this.G)
    })
  },
  onTabItemTap(item) {
    wx.showToast({
      title: 'tab点击'
    })
    console.log(item)
  }
}
</script>

<style lang="scss">
.userinfo {
  text-align: center;
  img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
  .nickname {
    margin-top: 20px;
  }
}
</style>
