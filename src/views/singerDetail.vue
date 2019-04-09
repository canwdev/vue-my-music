<template>
  <song-list :singer="singer" :songs="songs" @selectSong="handleSelectSong"></song-list>
</template>

<script>
  import songList from './songList'
  import {mapState} from 'vuex'
  import {getSingerDetail} from "../api/singer"
  import {getSongUrl} from "../api/song"
  import {createSong} from "../assets/js/song"
  import {allowBodyScroll} from "../assets/js/dom";
  import {playMode} from '../assets/js/common.js'
  import {shuffleArray} from "../assets/js/utils"


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
      allowBodyScroll(false);
    },
    beforeDestroy() {
      allowBodyScroll();
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
      // 处理单曲点击事件
      handleSelectSong(song, index, shufftle = false) {
        // getSongUrl(song.mid).then((res)=>{
        //   console.log(res)
        // })

        let config = {
          playing: true,
          fullscreen: true,
          playList: this.songs,
          currentIndex: index
        }

        // 随机播放所有歌曲
        if (shufftle) {
          config.mode = playMode.random,
          config.playList = shuffleArray(this.songs)
          config.backupList = this.songs
        }

        this.$store.commit('updatePlayer', config)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>