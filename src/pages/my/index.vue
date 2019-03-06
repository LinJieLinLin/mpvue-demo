<template>
  <div>
    <div class="userinfo">
      <img v-if="UserInfo.avatarUrl" :src="UserInfo.avatarUrl" background-size="cover" />
      <div class="nickname">
        {{UserInfo.nickName}}
      </div>
    </div>
    <button class="mg-x20" type="primary" open-type="openSetting" @click="openSetting()">授权设置</button>
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
    openSetting(rs) {
      console.log(rs)
    }
  },
  computed: {
    ...mapState(['UserInfo'])
  },
  onShow() {
  },
  mounted() {
    // this.f.getLocation(this.G).then(rs => {
    //   console.log(rs, this.G)
    // })
  },
  onTabItemTap(item) {
    this.f.toast('tab点击')
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
