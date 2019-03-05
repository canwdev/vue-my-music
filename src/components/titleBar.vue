<template>
  <div class="component-title-bar" :class="{transparent, fixed}">
    <a class="back" href="javascript:" @click="back"><span class="icon iconfont icon-arrow-back"></span></a>
    <p class="title">{{title}}</p>
    <a class="action" v-show="showAction" href="javascript:"></a>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      showAction: {
        type: Boolean,
        default: false
      },
      transparent: {
        type: Boolean,
        default: false
      }
      ,
      fixed: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
  .component-title-bar
    position relative
    height: 45px
    color: $color-text
    background $color-bg
    box-shadow $navbar-shadow
    transition all .3s
    a
      color: $color-text
    &.transparent
      background linear-gradient(top, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
      color: #fff
      box-shadow unset
      a
        color: #fff
    &.fixed
      position fixed
      top: 0
      left: 0
      width: 100%
      z-index 200
    .action,.back
      position absolute
      top 50%
      transform translateY(-50%)
      padding 10px
      box-sizing border-box
      .iconfont
        font-size $font-xl
    .action
      right 0
    .back
      left 0
    .title
      line-height: 45px
      text-align: center
      font-size $font-l
      font-weight: bold
      width: 70%;
      margin: 0 auto
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden
</style>