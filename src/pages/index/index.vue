<template>
  <div class="">
    <div class="page">
      <section v-if="page=='index'">
        <div class="index" @click="clickHandle('test click', $event)">
          <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
            <div class="userinfo-nickname">
              <card :text="userInfo.nickName"></card>
            </div>
          </div>

          <div class="usermotto">
            <div class="user-motto">
              <card :text="motto"></card>
            </div>
          </div>
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
          <button class=" " type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">按钮授权</button>
          <button class="mg-t20" type="primary" open-type="openSetting">授权设置</button>
          <button class="mg-t20" type="primary" open-type="contact">客服会话</button>
          <button class="mg-t20" type="primary" @click="testHttp">测试超时</button>
          <button class=" " type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">按钮授权</button>
          <button class="mg-t20" type="primary" open-type="openSetting">授权设置</button>
          <button class="mg-t20" type="primary" open-type="contact">客服会话</button>
          <button class="mg-t20" type="primary" @click="t">测试超时</button>
          <div class="mg-t20">
            <scan-code :c="cfSc"></scan-code>
          </div>
        </div>
      </section>
      <section v-if="page=='wm'">
        <div class="index" @click="clickHandle('test click', $event)">
          <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
            <div class="userinfo-nickname">
              <card :text="userInfo.nickName"></card>
            </div>
          </div>

          <div class="usermotto">
            <div class="user-motto">
              <card :text="motto"></card>
            </div>
          </div>
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
          <a href="f.toPage('/pages/counter/main','')">去往log示例页面</a>
        </div>
      </section>
    </div>
    <footer class="flex-shrink" scroll-top>
      <div>1{{page}}</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// components
import card from '@/components/card'
import scanCode from '@/components/scan-code'
export default {
  config: {
    enablePullDownRefresh: true
  },
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
      },
      userInfo: {}
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
    },
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo(rs) {
      console.log(rs)
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  computed: {
    ...mapState(['page'])
  },
  created() {
    console.log(this.G)
    this.$store.state.page = 'index'
    this.$http.get('/mock/18016/test').then(
      rs => {
        console.log(rs)
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>

<style scoped lang="scss">
$footerH: 100px;
.index {
}
.page {
  margin-bottom: $footerH;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: $footerH;
  background-color: gray;
}
</style>
