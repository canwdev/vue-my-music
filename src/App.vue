<template>
  <div class="app" id="app">
    <v-header></v-header>
    <header-tabs :class="{'fixed': fixedNavbar}"></header-tabs>
    <div class="fixed-navbar-placeholder" v-show="fixedNavbar"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from './components/header'
  import headerTabs from './components/headerTabs'
  import bus from './assets/js/bus'

  export default {
    components: {
      vHeader,
      headerTabs
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
      box-shadow 0px 2px 8px 0px rgba(51,51,51,0.12)
</style>