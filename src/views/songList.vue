<template>
  <transition name="slide">
    <div class="view-song-list" ref="songList">
      <title-bar :title="singer.name" :transparent="!titleBarBg" :fixed="true"></title-bar>
      <div class="cover-box" ref="coverBox">
        <img :src="singer.avatar">
      </div>

      <loading v-show="!songs.length"></loading>
      <ul class="list-wrap">
        <li v-for="(item, index) in songs" :key="index">
          <p class="song-name">{{item.name}}</p>
          <p class="song-album">{{item.singer}} - {{item.album}}</p>
        </li>
      </ul>


    </div>
  </transition>
</template>

<script>
  import titleBar from '../components/titleBar'
  import loading from "../components/loading/loading"

  export default {
    components: {
      titleBar,
      loading
    },
    props: {
      singer: {
        type: Object,
        default() {
          return {
            title: '加载失败'
          }
        }
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        titleBarBg: false
      }
    },
    mounted() {
      this.scrollHandler();
    },
    methods: {
      scrollHandler() {
        let scroll = this.$refs.songList;
        let coverBox = this.$refs.coverBox;
        let coverHeight = coverBox.clientHeight - 45;

        scroll.addEventListener('scroll', (evt) => {
          let top = scroll.scrollTop

          this.titleBarBg = top >= coverHeight
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
  .component-title-bar.bg
    color: $color-text
    background $color-bg
    box-shadow $navbar-shadow
    a
      color: $color-text
  .view-song-list
    position fixed
    top 0
    left 0
    width 100%
    bottom 0
    background $color-bg
    z-index 200
    overflow auto

    .list-wrap
      padding 10px 10px
      &>li
        padding 15px 10px
        &:active
          background $color-bg-dark
        .song-name
          font-weight: bold
          font-size $font-m
          margin-bottom: 5px
        .song-album
          color: #747474
          font-size $font-s
          line-height: $font-m
      &>li+li
        border-top 1px solid $color-bg-dark
    .cover-box
      width 100%
      height 0
      padding-bottom 100%
      position: relative
      &>img
        position: absolute
        width 100%
        height: 100%
        top 0
        left 0
        right 0
        bottom 0
        object-fit cover
</style>