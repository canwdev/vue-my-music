<template>
  <div class="component-title-bar">
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
    .action,.back
      position absolute
      top 50%
      transform translateY(-50%)
      padding 10px
      box-sizing border-box
      .iconfont
        font-size $font-xl
        color: $color-text
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