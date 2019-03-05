<template>
  <song-list :singer="singer" :songs="songs"></song-list>
</template>

<script>
  import songList from './songList'
  import {mapState} from 'vuex'
  import {getSingerDetail} from "../api/singer"
  import {createSong} from "../assets/js/song"

  export default {
    components: {
      songList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
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

        // console.log(ret)
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

</style>