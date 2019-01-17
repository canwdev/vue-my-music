<template>
  <div class="component-loading">
    <img src="./loading.svg">
    <p>加载中...</p>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/css/theme.styl"

  .component-loading
    z-index 100
    position: fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    text-align: center
</style>