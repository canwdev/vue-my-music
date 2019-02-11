<template>
  <div class="view-singer">
    <singer-list :list="singers"></singer-list>
  </div>
</template>

<script>
  import {getSingerList} from "../api/recommend"
  import singerList from '../components/singerList'

  export default {
    components: {
      singerList
    },
    created () {
      this._getSingerList()
    },
    data () {
      return {
        singers: []
      }
    },
    methods: {
      _getSingerList () {
        getSingerList().then((res)=> {
          console.log(res)
          if (res.code === 0) {
            // this.singers = res.data.list
            this.normalizeSingerList(res.data.list)
          }
        })
      },
      normalizeSingerList (res) {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
</style>
