<template>
  <div class="component-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentSlideIndex === index}"></span>
    </div>
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
    data () {
      return {
        dots: [],
        currentSlideIndex: 0
      }
    },
    mounted () {
      // 待页面框架加载完成
      this.$nextTick(()=> {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      })

      window.addEventListener('resize', ()=> {
        if (!this.slider) {
          return
        }

        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize = false) {
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

        if (this.loop && !isResize) {
          // clone 2 sliders
          width += 2*sliderWidth
        }

        sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,  // 惯性
          snap: {           // 支持循环轮播属性
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })

        this.slider.on('scrollEnd', ()=> {
          let index = this.slider.getCurrentPage().pageX
          this.currentSlideIndex = index

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', ()=> {
          if (this.autoPlay) {
            clearTimeout()
          }
        })
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.slider.next()
        }, this.interval)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
  .component-slider
    min-height: 1px
    position: relative
    .slider-group
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        display: block
        width: 100%
        text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: rgba(255, 255, 255, 0.52)
        box-shadow 0 0 1px #000
        &.active
          background: $color-theme
</style>
