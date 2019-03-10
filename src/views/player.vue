<template>
  <div class="view-player">
    <transition name="slideup">
      <div class="fullscreen-player fullscreen-view" v-show="player.fullscreen">
        <div class="background"></div>
        <title-bar
            :btn-back="customBack"
            :btn-action="customAction"
            :title="'歌曲标题'"
            :subtitle="'歌手'"
            :transparent="true"
        ></title-bar>
        <div class="cover-box">
          <div class="cd-wrap">
            <p class="icon iconfont icon-audiotrack"></p>
          </div>
        </div>
        <div class="control-box">
          <div class="seekbar-wrap"></div>
          <div class="play-control-wrap">
            <a class="playmode iconfont icon-repeat"></a>
            <a class="previous iconfont icon-skip-previous"></a>
            <a class="playpause iconfont icon-play-arrow"></a>
            <a class="next iconfont icon-skip-next"></a>
            <a class="playlist iconfont icon-queue-muspx"></a>
          </div>
        </div>

      </div>
    </transition>

    <transition name="slideup">
      <div class="mini-player" v-show="!player.fullscreen && player.currentIndex !== -1" @click="show">
        <div class="cover"></div>
        <div class="title-box">
          <div class="title">音乐标题</div>
          <div class="subtitle">作者</div>
        </div>
        <div class="control-box">
          <a class="play iconfont icon-play-arrow"></a>
          <a class="list iconfont icon-queue-muspx"></a>
        </div>
      </div>
    </transition>
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
          action: this.hide
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
      show() {
        this.$store.commit('updatePlayer', {
          fullscreen: true
        })
      },
      hide() {
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
    .background
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      background linear-gradient(to bottom, #424242 0%, #212121 100%);
      z-index -1
    .cover-box
      position absolute
      top 70px
      left 0
      width 100%
      bottom 164px
      display flex
      align-items center
      justify-content center
      .cd-wrap
        width 70%
        height 0
        padding-bottom 70%
        border-radius 50%
        background: radial-gradient(ellipse at center, #ffffff 0%, #b8b8b8 47%, #222222 48%, #0a0809 100%)
        box-shadow 0px 2px 8px 0px rgba(0, 0, 0, 0.5)
        animation rotate 10s linear infinite
        &>p
          position: absolute
          left: 50%
          top 50%
          transform translate(-50%, -50%)
          font-size 100px
          color $color-sub-theme
    .control-box
      position: absolute
      bottom 10px
      left 0
      width 100%
      overflow: hidden
      >>>.iconfont
        color #fff
        font-size $font-xxl
      .seekbar-wrap
        height 50px
        margin-bottom: 10px
      .play-control-wrap
        position: relative
        height 80px
        &>a
          display block
          position: absolute
          top 0
          line-height: 80px
        .playlist, .playmode
          font-size 30px
        .playmode
          left 20px
        .playlist
          right 20px
        .previous, .next
          font-size 45px
        .previous
          left 25%
        .next
          right 25%
        .playpause
          left 50%
          transform translateX(-50%)
          font-size 60px
  .mini-player
    position fixed
    bottom 0
    left 0
    width 100%
    z-index 300
    height 55px
    background $color-bg
    display flex
    align-items center
    box-shadow 0px -2px 8px 0px rgba(51,51,51,0.12)
    .cover
      align-self stretch
      width 15%
      background $color-bg-dark
    .title-box
      flex 1
      padding 0 10px
      box-sizing border-box
      .title
        font-weight: bold
        font-size $font-l
        line-height $font-xl
      .subtitle
        font-size $font-m
    .control-box
      &>a
        box-sizing border-box
        padding 10px
        color $color-text
        font-size 32px
    .tmp
      font-size 0
</style>