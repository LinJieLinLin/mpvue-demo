<template>
  <div class="container" @click="clickHandle('test click', $event)">

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

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <a href="/pages/logs/main" class="counter">去往log示例页面</a>
    <button class=" " type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">按钮授权</button>
    <button class="mg-t20" type="primary" open-type="openSetting">授权设置</button>
    <button class="mg-t20" type="primary" open-type="contact">客服会话</button>
    <button class="mg-t20" type="primary" @click="testHttp">测试超时</button>
    <div class="mg-t20">
      <scan-code :c="cfSc"></scan-code>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import scanCode from '@/components/scan-code'

export default {
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
  created() {
    console.log(this.G)
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
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.mg-t20 {
  margin-top: 20px;
}
</style>
