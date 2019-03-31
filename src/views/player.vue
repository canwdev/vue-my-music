<template>
  <div class="view-player">
    <transition name="slideup">
      <div class="fullscreen-player fullscreen-view" v-show="player.fullscreen">
        <div class="background">
          <img :src="currentSong.image">
          <div class="img-cover"></div>
        </div>
        <title-bar
            :btn-back="customBack"
            :btn-action="customAction"
            :title="currentSong.name"
            :subtitle="currentSong.singer"
            :transparent="true"
        ></title-bar>
        <div class="cover-box">
          <div class="cd-wrap" :class="{pause: !player.playing}">
            <img :src="currentSong.image">
            <!--<p class="icon iconfont icon-audiotrack"></p>-->
          </div>
        </div>
        <div class="control-box">
          <div class="seekbar-wrap">
            <span class="time-start">{{formatTime(currentTime)}}</span>
            <input type="range" min="0" :max="currentSong.duration" :value="currentTime" @input="seekbarSeeking" @change="seekbarChange" class="seekbar-box" ref="seekBar">

            <span class="time-end">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="play-control-wrap">
            <a class="playmode iconfont icon-repeat"></a>
            <a class="previous iconfont icon-skip-previous" @click="previousSong"></a>
            <a class="playpause iconfont" :class="{'icon-play-arrow': !player.playing, 'icon-pause': player.playing}" @click="togglePlaying()"></a>
            <a class="next iconfont icon-skip-next" @click="nextSong"></a>
            <a class="playlist iconfont icon-queue-muspx"></a>
          </div>
        </div>

      </div>
    </transition>

    <transition name="slideup">
      <div class="mini-player" v-show="!player.fullscreen && player.currentIndex !== -1">
        <div class="cover" @click="show">
          <img :src="currentSong.image">
        </div>
        <div class="title-box" @click="show">
          <div class="title">{{currentSong.name}}</div>
          <div class="subtitle">{{currentSong.singer}}</div>
        </div>
        <div class="control-box">
          <a class="play iconfont" :class="{'icon-play-arrow': !player.playing, 'icon-pause': player.playing}" @click.prevent="togglePlaying()"></a>
          <a class="list iconfont icon-queue-muspx" @click="openPlayList"></a>
        </div>
      </div>
    </transition>

    <audio ref="audio" :src="currentSongSrc" @timeupdate="timeUpdate"></audio>

  </div>
</template>

<script>
  import titleBar from '../components/titleBar'
  import {mapState} from 'vuex'
  import {getSongUrl} from "../api/song"

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
        },
        currentSongSrc: '',
        currentTime: 0,
        seeking: false
      }
    },
    computed: {
      ...mapState(['player']),
      currentSong() {
        return this.player.playList[this.player.currentIndex] || {}
      }
    },
    watch: {
      'player.fullscreen'(nv, ov) {
        if (this.currentSongSrc === '') {
          this.togglePlaying(true)
        }
      },
      currentSong(nv, ov) {
        getSongUrl(nv.mid).then((res)=>{
          this.currentSongSrc = res
        },(err)=>{
          this.$toast(err)
          console.log(err, nv)
          this.currentSongSrc = ''
          this.togglePlaying(true)

        }).catch((e)=>{
          console.log('获取音乐地址失败', e)
        })
      },
      currentSongSrc(nv, ov) {
        if (nv !== '') {
          this.$nextTick(()=>{
            this.togglePlaying(false)
          })
        } else {
          this.togglePlaying(true)
        }

      }
    },
    mounted() {
      // 键盘控制
      document.addEventListener('keyup', (e)=>{
        if (this.player.fullscreen) {
          switch (e.which) {
            case 32:  // 空格
              this.togglePlaying()
              break
            case 39:  // →
              this.nextSong()
              break
            case 37:  // ←
              this.previousSong()
              break
          }
        }
      })
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
        this.$toast('❤')
      },
      togglePlaying(playing = this.player.playing) {

        if (playing) {
          // 暂停
          this.$refs.audio.pause()
        } else if (this.currentSongSrc !== '') {
          // 播放
          this.$refs.audio.play()
        } else {
          this.$toast('无法播放：获取音乐地址失败')
          return
        }

        this.$store.commit('setPlaying', !playing)
      },
      previousSong() {
        if (this.player.currentIndex <= 0) {
          this.$toast('跳转到列表末尾')
          this.player.currentIndex = this.player.playList.length-1
          return
        }
        this.player.currentIndex--
      },
      nextSong() {
        if (this.player.currentIndex >= this.player.playList.length-1) {
          this.$toast('从列表第一首歌播放')
          this.player.currentIndex = 0
          return
        }
        this.player.currentIndex++
      },
      openPlayList() {

      },
      timeUpdate(e) {
        if (!this.seeking) {
          this.currentTime = e.target.currentTime
        }
      },
      formatTime(interval) {
        interval = Math.floor(interval)
        let minute = Math.floor(interval/60)
        let second = (interval % 60).toString().padStart(2, '0')
        return minute + ':' + second
      },
      seekbarSeeking(e) {
        this.seeking = true
        this.currentTime = e.target.value
      },
      seekbarChange(e) {
        this.seeking = false
        this.$refs.audio.currentTime = e.target.value
        this.togglePlaying(false)
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
      &>img
        width 100%
        height 100%
        opacity 1
        filter blur(20px)
        object-fit cover
      .img-cover
        position: absolute
        top: 0
        left 0
        width 100%
        height 100%
        background rgba(0, 0, 0, 0.3)
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
        animation rotate 15s linear infinite
        &.pause
          animation-play-state paused
        &>img
          position: absolute
          left: 50%
          top 50%
          transform translate(-50%, -50%)
          font-size 100px
          color $color-sub-theme
          border-radius 50%
          width 68%
          height 68%
          object-fit cover
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
        color: #fff
        display flex
        align-items center
        justify-content space-between
        padding 0 20px
        .seekbar-box
          width 75%
          height 5px
          background rgba(255, 255, 255, 0.25)
        .time-start, .time-end
          width 10%
          text-align: center
          font-size 12px
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
      &>img
        width 100%
        height 100%
        object-fit cover
    .title-box
      flex 1
      padding 0 10px
      box-sizing border-box
      align-self stretch
      display flex
      justify-content center
      flex-direction column
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