<template>
  <div class="component-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from "../assets/js/dom"

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 5000
      }
    },
    mounted () {
      // 待页面框架加载完成
      this.$nextTick(()=> {
        this._setSliderWidth()
        this._initSlider()
      })
    },
    methods: {
      _setSliderWidth () {
        let sliderGroup = this.$refs.sliderGroup
        this.children = sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        for (let i=0; i<this.children.length; i++) {
          let child = this.children[i]
          console.log(child)

          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop) {
          width += 2*sliderWidth
        }

        sliderGroup.style.width = width + 'px'
      },
      _initSlider () {

      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
