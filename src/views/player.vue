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
        <div class="player-main-box">
          <transition name="fade">
            <div class="cover-box" v-show="!showLyric" @click="showLyric = true">
              <div class="cd-wrap" :class="{pause: !player.playing}">
                <img :src="currentSong.image">
                <!--<p class="icon iconfont icon-audiotrack"></p>-->
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div class="lyric-wrap" v-show="showLyric" @click="showLyric = false">

              <div class="volume-wrap">
                <p class="vw--title">音量</p>
                <div class="common-seekbar-box">
                  <div class="csb--fill"
                       :style="'width: '+(audioVolume/100)*100+'%'"
                  ></div>
                  <input type="range" min="0" max="100" :value="audioVolume" @input="seekbarVolumeSeeking" class="common-seekbar seekbar-input" ref="seekBar">
                </div>
              </div>

              <ul class="lrc-main">
                <li v-if="lyricArr"
                  v-for="(v,i) in lyricArr.lines"
                  :key="i"
                >{{ v.txt }}</li>
              </ul>
            </div>
          </transition>

          <div class="actions">
            <button @click="downloadSong">下载</button>
          </div>
        </div>

        <div class="control-box">
          <div class="seekbar-wrap">
            <span class="time-start">{{formatTime(currentTime)}}</span>
            <div class="common-seekbar-box">
              <div class="csb--fill"
                   :style="'width: '+(currentTime/currentSong.duration)*100+'%'"
              ></div>
              <input type="range" min="0" :max="currentSong.duration" :value="currentTime" @input="seekbarProgressSeeking" @change="seekbarProgressChange" class="common-seekbar seekbar-input" ref="seekBar">
            </div>


            <span class="time-end">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="play-control-wrap">
            <a class="playmode iconfont"
               :class="playModeClass"
               @click="togglePlayMode"
            ></a>

            <a class="previous iconfont icon-skip-previous" @click="previousSong"></a>

            <a class="playpause iconfont"
               :class="{'icon-play-arrow': !player.playing, 'icon-pause': player.playing}"
               @click="togglePlaying()"></a>

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

    <audio ref="audio" :src="currentSongSrc" @timeupdate="timeUpdate" @ended="musicEnd" @pause="togglePlaying(true)"></audio>

  </div>
</template>

<script>
  import titleBar from '../components/titleBar'
  import {mapState} from 'vuex'
  import {getSongUrl, getLyric} from "../api/song"
  import {playMode} from "../assets/js/common"
  import {shuffleArray} from "../assets/js/utils"
  import {Base64} from 'js-base64'
  import LyricParser from 'lyric-parser'
  import {allowBodyScroll} from "../assets/js/dom";

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
        seeking: false,
        showLyric: false,
        lyricArr: {
          lines: []
        },
        audioVolume: 90
      }
    },
    computed: {
      ...mapState(['player']),
      currentSong() {
        return this.player.playList[this.player.currentIndex] || {}
      },
      playModeClass() {

        if (this.player.mode === playMode.normal) {
          return 'icon-repeat'
        } else if (this.player.mode === playMode.loop) {
          return 'icon-repeat-one'
        } else if (this.player.mode === playMode.random) {
          return 'icon-shuffle'
        }
        return ''
      }
    },
    watch: {
      'player.fullscreen'(nv, ov) {
        if (this.currentSongSrc === '') {
          this.togglePlaying(true)
        }
        allowBodyScroll(nv !== true)

        if (nv===true) {
          window.addEventListener('popstate', this.backPreviousPage)
        } else {
          window.removeEventListener('popstate', this.backPreviousPage)
          window.history.forward(1);
        }

      },
      currentSong(nv, ov) {
        if (nv.mid === ov.mid) {
          return
        }
        getSongUrl(nv.mid).then((res) => {
          this.currentSongSrc = res
        }, (err) => {
          this.$toast(err)
          console.log(err, nv)
          this.currentSongSrc = ''
          this.togglePlaying(true)
        }).catch((e) => {
          console.log('获取音乐地址失败', e)
        })

        getLyric(nv.mid).then((res)=> {
          let lyricTxt = Base64.decode(res.lyric)
          this.lyricArr = new LyricParser(lyricTxt, this.handleLyric)
        }).catch((e) => {
          console.log('获取歌词失败', e)
        })
      },
      currentSongSrc(nv, ov) {
        this.$refs.audio.currentTime = 0
        if (nv !== '') {
          this.$nextTick(() => {
            this.togglePlaying(false)
          })
        } else {
          this.togglePlaying(true)
        }

      }
    },
    mounted() {
      // 键盘控制
      document.addEventListener('keyup', (e) => {
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
      /**
       * 切换播放与暂停
       * @param playing 为true时暂停，反之播放
       */
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
          this.player.currentIndex = this.player.playList.length - 1
          return
        }
        this.player.currentIndex--
      },
      nextSong() {
        if (this.player.currentIndex >= this.player.playList.length - 1) {
          this.$toast('从列表第一首歌播放')
          this.player.currentIndex = 0
          return
        }
        this.player.currentIndex++
      },
      loopSong() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
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
        let minute = Math.floor(interval / 60)
        let second = (interval % 60).toString().padStart(2, '0')
        return minute + ':' + second
      },
      musicEnd() {
        if (this.player.mode === playMode.loop) {
          this.loopSong()
        } else {
          this.nextSong()
        }
      },
      seekbarProgressSeeking(e) {
        this.seeking = true
        this.currentTime = e.target.value
      },
      seekbarProgressChange(e) {
        this.seeking = false
        this.$refs.audio.currentTime = e.target.value
        this.togglePlaying(false)
      },
      seekbarVolumeSeeking(e) {
        this.audioVolume = e.target.value
        this.$refs.audio.volume = e.target.value/100
      },

      togglePlayMode() {
        const mode = (this.player.mode + 1) % 3
        this.$store.commit('updatePlayer', {
          mode
        })

        if (mode === playMode.random) {
          // 切换随机播放模式
          // 打乱原有播放列表
          let randomList = shuffleArray(this.player.playList)
          // 更新现在播放歌曲的currentIndex
          let currentIndex = randomList.findIndex((v, i)=>{
            return (v.mid === this.currentSong.mid)
          })

          console.log('随机播放', currentIndex)

          this.$store.commit('updatePlayer', {
            currentIndex,
            playList: randomList,
            backupList: this.player.playList
          })
        } else {
          // 切换回正常播放模式
          let backupList = this.player.backupList
          if (backupList.length > 0) {
            let currentIndex = backupList.findIndex((v, i)=>{
              return (v.mid === this.currentSong.mid)
            })

            console.log('正常播放', currentIndex)

            this.$store.commit('updatePlayer', {
              currentIndex,
              playList: backupList,
              backupList: []
            })
          }
        }
      },
      downloadSong() {
        let src = this.currentSongSrc
        if (src === '') {
          this.$toast('获取下载地址失败')
          return
        }

        var a = document.createElement('a');
        var filename = '';
        a.href = src;
        a.download = 'filename';
        a.target = '_blank'
        a.click();
        window.URL.revokeObjectURL(src);
      },
      // 歌词回调
      handleLyric({lineNum, txt}) {
        console.log(lineNum, txt)
      },
      backPreviousPage(e) {
        e.preventDefault()
        console.log('navigate')
        this.hide()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
.common-seekbar-box
  width 100%
  height 50px
  display flex
  align-items center
  position: relative
  .csb--fill
    position: absolute
    top 50%
    transform translateY(-50%)
    height 5px
    width 0
    background #fff
    user-select none
    pointer-events none
    z-index -1
.common-seekbar
  width 100%
  height 5px
  background rgba(255, 255, 255, 0.25)
  appearance: none;
  &::-webkit-slider-thumb
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background #fff

.view-player
  .fullscreen-player
    z-index 301
    overflow: hidden
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
    .player-main-box
      position absolute
      z-index -1
      top 70px
      left 0
      width 100%
      bottom 164px

      &>.actions
        position: absolute
        bottom 0
        left 0
        width 100%
        text-align: center
        &>button
          background transparent
          border 1px solid #fff
          color #fff
          border-radius 5px
          padding 2px 5px
      .cover-box
        position: absolute
        top 0
        left 0
        width 100%
        bottom 0
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
      .lyric-wrap
        position: absolute
        top 0
        left 2%
        width 96%
        bottom 0
        color: #fff
        .volume-wrap
          width 86%
          margin 0 auto
          display flex
          flex-direction row
          align-items center
          .vw--title
            width 20%
        .lrc-main
          position: absolute
          top: 50px
          left 0
          width 100%
          bottom 35px
          overflow: auto
          text-align: center
          &>li
            font-size 14px
            line-height: 2
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
        .common-seekbar-box
          width 75%
          height 100%
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
          transition all .3s
          &:active
            text-shadow 0 0 30px #fff
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
      &>img
        width 100%
        height 100%
        object-fit contain
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