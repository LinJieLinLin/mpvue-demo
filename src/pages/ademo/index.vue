<template>
  <div>
    <div class="">vant星星组件</div>
    <van-rate color="red" :value="value" @change="onChange" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      value: 3
    }
  },
  computed: {

  },
  watch: {},
  created() { },
  mounted() {

  },
  destroyed() { },
  methods: {
    onChange(event) {
      this.value = event.detail
    }
  },
  onShow() {
    // 活动时
  }
}
</script>

<style scope lang="scss">
</style>
