<template>
  <div class="component-loading" :class="{'fixed' : fixed}">
    <img src="./loading.svg">
    <p>加载中...</p>
  </div>
</template>

<script>
  export default {
    props: {
      fixed: {
        default: false,
        type: Boolean
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/css/theme.styl"

  .component-loading
    text-align: center
    padding: 10px
    &>img
      transform translateY(20px)
    &.fixed
      z-index 100
      position: fixed
      top 50%
      left 50%
      transform translate(-50%, -50%)
</style>