<template>
  <div class="">
    <div class="pd-x20">
      <section>
        <div>
          <div class="usermotto">
            <div class="user-motto">
              <card :text="motto"></card>
            </div>
          </div>
          <p>Vuex counter：{{ count }}</p>
          <img class="userinfo-avatar" src="/static/img/1.png" background-size="cover" />
          <div class="userinfo-avatar i1" src="../../asset/img/1.png" background-size="cover"></div>
          <div class="userinfo-avatar i2" background-size="cover"></div>
          <div class="userinfo-avatar i3" src="../../asset/img/3.jpg" background-size="cover"></div>
          <form class="form-container">
            <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
          </form>
          <i class="image-i-ly"></i>
          <i class="image-i-gm"></i>
          <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
          <a href="/pages/logs/main" class="counter">去往log示例页面</a>
          <a href="toPage('/pages/counter/main','')"></a>
          <button class="mg-t20" type="primary" open-type="openSetting">授权设置</button>
          <button class="mg-t20" type="primary" open-type="contact">客服会话</button>
          <button class="mg-t20" type="primary" @click="testHttp">测试超时</button>
          <button class="mg-t20" type="primary" open-type="openSetting">授权设置</button>
          <button class="mg-t20" type="primary" open-type="contact">客服会话</button>
          <button class="mg-t20" type="primary" @click="t">测试超时</button>
          <div class="mg-t20">
            <scan-code :c="cfSc"></scan-code>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
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
      motto: 'Hello World',
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
    qrcode(res) {
      wx.showToast({ title: res.result, icon: 'none' })
    },
    testHttp() {
      wx.startPullDownRefresh()
      this.$http
        .request('/mock/18016/test', null, {
          timeout: 100
        })
        .then(
          rs => {
            console.log(rs)
          },
          err => {
            console.log(err)
          }
        )
    }
  },
  computed: {
    ...mapState(['page', 'count'])
  },
  created() {
    this.$http.get('/mock/18016/test').then(
      rs => {
        console.log(rs)
      },
      err => {
        console.log(err)
      }
    )
  },
  onShow() {}
}
</script>

<style scoped lang="scss">
</style>
