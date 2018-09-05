<template>
    <div>
        <button :plain="c.plain||false" :type="c.type||'primary'" @click="qrcode">{{c.name||'扫码'}}</button>
    </div>
</template>

<script>
/*

*/
export default {
  props: {
    c: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    qrcode() {
      wx.scanCode({
        // 只允许从相机扫码
        onlyFromCamera: this.c.onlyFromCamera || false,
        scanType: ['barCode'],
        success: res => {
          console.log(res)
          if (typeof this.c.cb === 'function') {
            this.c.cb(res)
          }
        }
      })
    }
  }
}
</script>

<style scope>
</style>
