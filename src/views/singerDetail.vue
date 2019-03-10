<template>
  <song-list :singer="singer" :songs="songs" @selectSong="handleSelectSong"></song-list>
</template>

<script>
  import songList from './songList'
  import {mapState} from 'vuex'
  import {getSingerDetail} from "../api/singer"
  import {getSongUrl} from "../api/song"
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
      // 加载歌曲列表
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
      // 格式化歌曲列表
      _normalizeSong(list) {
        let ret = [];
        list.forEach((v)=> {
          let {musicData} = v;
          ret.push(createSong(musicData))
        })

        // console.log(ret)
        return ret;
      },
      // 切换窗口滚动
      allowBodyScroll (yes = true) {
        let bodyEl = document.body;
        if (!yes) {
          bodyEl.style.overflow = 'hidden';
          return
        }
        bodyEl.style.overflow = 'unset';
      },
      // 处理单曲点击事件
      handleSelectSong(song, index) {
        // getSongUrl(song.mid).then((res)=>{
        //   console.log(res)
        // })

        this.$store.commit('updatePlayer', {
          playing: true,
          fullscreen: true,
          playList: this.songs,
          currentIndex: index
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>