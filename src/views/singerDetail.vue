<template>
  <transition name="slide">
    <div class="view-song-list">
      <title-bar :title="title"></title-bar>
    </div>
  </transition>
</template>

<script>
  import titleBar from '../components/titleBar'
  import {mapState} from 'vuex'
  import {getSingerDetail} from "../api/singer"
  import {createSong} from "../assets/js/song"

  export default {
    components: {
      titleBar
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      ...mapState([
        'singer'
      ])
    },
    mounted() {
      this.loadSongList();
      this.allowBodyScroll(false);
    },
    beforeDestroy() {
      this.allowBodyScroll();
    },
    methods: {
      loadSongList() {
        let id = this.singer.id;
        if (!id) {
          this.$router.back()
        }
        getSingerDetail(id).then((res)=> {
          if (res.code === 0) {
            this.songs = this._normalizeSong(res.data.list);
          }
        })

      },
      _normalizeSong(list) {
        let ret = [];
        list.forEach((v)=> {
          let {musicData} = v;
          ret.push(createSong(musicData))
        })

        console.log(ret)
        return ret;
      },

      allowBodyScroll (yes = true) {
        let bodyEl = document.body;
        if (!yes) {
          bodyEl.style.overflow = 'hidden';
          return
        }
        bodyEl.style.overflow = 'unset';
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"

  .view-song-list
    position fixed
    top 0
    left 0
    width 100%
    bottom 0
    background $color-bg
    z-index 200

</style>