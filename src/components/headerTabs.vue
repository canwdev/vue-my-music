<template>
  <div class="component-header-tabs">
    <router-link to="/recommend" class="tab-item">推荐</router-link>
    <router-link to="/singer" class="tab-item">歌手</router-link>
    <router-link to="/rank" class="tab-item">排行</router-link>
    <router-link to="/search" class="tab-item">搜索</router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"

  .component-header-tabs
    display flex
    justify-content space-around
    align-items center
    height 45px
    background $color-bg-dark
    margin-top -1px
    transition all .5s
    .tab-item
      color $color-text
      flex 1
      display flex
      align-items center
      justify-content center
      align-self stretch
      font-size $font-m2
      &.router-link-active
        color: $color-theme
        position relative
        &::after
          content: ''
          position absolute
          bottom 0
          left 0
          right 0
          height 3px
          background $color-theme
</style>