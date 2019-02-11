<template>
  <div class="view-recommend">
    <div v-if="recommends.slider" class="slider-wrap">
      <slider>
        <a :href="item.linkUrl" target="_blank" v-for="(item, index) in recommends.slider" :key="index">
          <img :src="item.picUrl">
        </a>
      </slider>
    </div>

    <h4 class="recommend-title">歌单推荐(Mobile)</h4>
    <div class="songlist-wrap songlist-style2">
      <a href="javascript:void(0)" class="songlist-item" v-for="(item, index) in recommends.songList" :key="index">
        <div class="song-img">
          <img v-lazy="item.picUrl">
        </div>
        <div class="song-info">
          <p>{{item.songListDesc}}</p>
        </div>
      </a>
    </div>

      <h4 class="recommend-title">歌单推荐(Desktop)</h4>
      <loading v-show="!fullLoaded"></loading>

    <div v-show="fullLoaded">
      <div class="songlist-wrap">
        <a href="javascript:void(0)" class="songlist-item" v-for="(item, index) in diskList" :key="index">
          <div class="song-img">
            <img v-lazy="item.imgurl">
          </div>
          <div class="song-info">
            <p>{{item.dissname}}</p>
          </div>
        </a>
      </div>
    </div>


  </div>
</template>

<script>
  import {getRecommend, getDiscList} from "../api/recommend"
  import {CODES} from "../api/config"
  import slider from "../components/slider"
  import loading from "../components/loading/loading"

  export default {
    components: {
      slider,
      loading
    },
    data() {
      return {
        recommends: {},
        diskList: [],
        fullLoaded: false
      }
    },
    created() {
      this._getRecommend()
      this._getSongList()
    },
    methods: {
      // 获取推荐轮播图
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === CODES.ERR_OK) {
            this.recommends = res.data
          }
        })

      },
      _getSongList() {
        getDiscList().then((res) => {
          if (res.code === CODES.ERR_OK) {
            this.diskList = res.data.list

            this.fullLoaded = true
          }
        })
      },

    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
  .view-recommend
    background $color-bg-dark

    .slider-wrap
      overflow: hidden

    .songlist-wrap
      width 95%
      display flex
      justify-content space-between
      flex-wrap wrap
      margin 0 auto

      &.songlist-style2
        width 100%

        .songlist-item
          display flex
          width 100%
          border-radius 0

          .song-img
            width 22%
            padding-bottom 22%

          .song-info
            flex 1
            padding 10px

      .songlist-item
        background $color-bg
        width 49%
        margin-bottom 2%
        border-radius 4px
        overflow: hidden
        box-shadow 0 1px 1px rgba(0, 0, 0, 0.12)

        .song-img
          width 100%
          height 0
          padding-bottom 100%
          position relative

          img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            object-fit cover

        .song-info
          padding 5px
          box-sizing border-box
          font-size $font-m
          line-height $font-l

    .recommend-title
      font-size $font-l
      padding 20px
      box-sizing border-boxx
      color $color-sub-theme
      text-align center
</style>
