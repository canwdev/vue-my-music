<template>
  <div class="view-player">
    <transition name="slideup">
      <div class="fullscreen-player fullscreen-view" v-show="player.fullscreen">
      <title-bar
          :btn-back="customBack"
          :btn-action="customAction"
      ></title-bar>
    </div>
    </transition>

    <div class="mini-player" v-show="!player.fullscreen && player.currentIndex !== -1">

    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import titleBar from '../components/titleBar'

  export default {
    components: {
      titleBar
    },
    data() {
      return {
        customBack: {
          custom: true,
          text: `<span class="icon iconfont icon-details"></span>`,
          action: this.close
        },
        customAction: {
          custom: true,
          text: `<span class="icon iconfont icon-favorite-border"></span>`,
          action: this.addFavourite
        }
      }
    },
    computed: {
      ...mapState(['player'])
    },
    methods: {
      close() {
        this.$store.commit('updatePlayer', {
          fullscreen: false
        })
      },
      addFavourite() {
        console.log('❤')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"

.view-player
  .fullscreen-player
    z-index 301
  .mini-player
    position fixed
    bottom 0
    left 0
    width 100%
    z-index 300
    height 55px
    background $color-bg-dark
</style>