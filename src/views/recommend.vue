<template>
  <div class="view-recommend">
    <div v-if="recommends.length" class="slider-wrap">
      <slider>
        <a :href="item.linkUrl" target="_blank" v-for="(item, index) in recommends" :key="index">
          <img :src="item.picUrl">
        </a>
      </slider>
    </div>
  </div>
</template>

<script>
  import {getRecommend} from "../api/recommend"
  import {CODES} from "../api/config"
  import slider from "../components/slider"

  export default {
    components: {
      slider
    },
    data () {
      return {
        recommends: {}
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      // 获取推荐轮播图
      _getRecommend () {
        getRecommend().then((res)=> {
          if (res.code === CODES.ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
  .view-recommend
    .slider-wrap
      overflow: hidden
</style>
