<template>
  <div class="component-header">
    <span></span>

    <p class="title"><span class="icon iconfont icon-audiotrack"></span> MUSIC</p>
    <router-link to="/" class="menu-item">
      <span class="icon iconfont icon-account-circle"></span>
    </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"

  .component-header
    position relative
    display flex
    justify-content space-between
    align-items center
    height 45px
    padding 10px
    box-sizing border-box
    background $color-bg-dark
    .menu-item
      .icon
        font-size $font-xxl
    .title
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      color: $color-theme
      .icon
        color: $color-sub-theme
        font-size $font-xl
</style>