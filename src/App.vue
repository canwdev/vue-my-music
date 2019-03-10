<template>
  <div class="app" id="app">
    <v-header></v-header>
    <header-tabs :class="{'fixed': fixedNavbar}"></header-tabs>
    <div class="fixed-navbar-placeholder" v-show="fixedNavbar"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import vHeader from './components/header'
  import headerTabs from './components/headerTabs'
  import bus from './assets/js/bus'
  import player from './views/player'

  export default {
    components: {
      vHeader,
      headerTabs,
      player
    },
    data () {
      return {
        fixedNavbar: false
      }
    },
    mounted () {
      this._scrollOptimization()
    },
    methods: {
      // 顶部导航滚动优化
      _scrollOptimization () {
        window.addEventListener('scroll', (e) => {
          // 节流函数
          if (this.scrollLimiter) {
            clearTimeout(this.scrollLimiter)
          }
          this.scrollLimiter = setTimeout(()=>{
            const maxOffsetTop = 90 //45+45
            let top = document.documentElement.scrollTop
            this.fixedNavbar = top > maxOffsetTop

            // 向singerList组件传值
            if (this.$route.path === '/singer') {
              bus.$emit('singerListScroll', top)
            }
          }, 5)
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "./assets/css/theme.styl"

  .fixed-navbar-placeholder
    height: 45px
  .component-header-tabs
    &.fixed
      z-index 99
      position: fixed
      top: 0
      left: 0
      width 100%
      background rgba(255, 255, 255, 0.92)
      animation fadeIn 0.5s
      box-shadow $navbar-shadow
</style>