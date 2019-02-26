<template>
  <div class="">
    <div class="pd-x20">
      <section>
        <div>
          <p>Vuex counter：{{ count }}</p>
          <img class="userinfo-avatar" src="/static/img/1.png" background-size="cover" />
          <div class="userinfo-avatar i1" src="../../asset/img/1.png" background-size="cover"></div>
          <button class="mg-t20" type="primary" @click="f.toPage('index')">回首页</button>
          <div class="mg-t20">
            <scan-code :c="cfSc"></scan-code>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// components
import card from '@/components/card'
import scanCode from '@/components/scan-code'
export default {
  async onPullDownRefresh() {
    // to doing..
    console.log('下拉')
    wx.stopPullDownRefresh()
  },
  async onReachBottom() {
    console.log('上拉')
  },
  data() {
    return {
      cfSc: {
        plain: false,
        type: 'primary',
        onlyFromCamera: true,
        cb: this.qrcode
      }
    }
  },
  components: {
    card,
    scanCode
  },
  methods: {
    ...mapActions(['TestGet', 'TestPost']),
    testGet() {
      this.TestGet().then(res => {
        console.log(res)
      }).catch(err => {
        console.log('err:', err)
      })
    },
    qrcode(res) {
      wx.showToast({ title: res.result, icon: 'none' })
    },
    testHttp() {
      wx.startPullDownRefresh()
    }
  },
  computed: {
    ...mapState(['page', 'count'])
  },
  created() {
    this.testGet()
  },
  onShow() { }
}
</script>

<style scoped lang="scss">
</style>
