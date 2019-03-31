import Vue from 'vue'
import Vuex from 'vuex'
import {playMode} from "./assets/js/common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singer: {},
    player: {
      playing: false,
      fullscreen: false,
      playList: [],
      backupList: [],
      mode: playMode.normal,
      currentIndex: -1
    }
  },
  mutations: {
    updateSinger(state, singer) {
      state.singer = singer
    },
    updatePlayer(state, {...playerSet}) {
      state.player = Object.assign(state.player, playerSet)
    },
    setPlaying(state, flag) {
      state.player.playing = flag
    },

  },
  actions: {

  }
})
