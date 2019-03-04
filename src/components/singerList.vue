<template>
  <div class="component-list-view">
    <div class="list-scroll" ref="singerList">

      <div class="list-type"
           v-for="(singerType, index) in list"
           :key="index"
           :data-index="index"
           ref="singerListGroup"
      >
        <p class="type-title">{{singerType.title}}</p>
        <div class="list-item"
             v-for="(singer, index) in singerType.items"
             :key="index"
             @click="selectSinger(singer)"
        >
          <img v-lazy="singer.avatar">
          <p>{{singer.name}}</p>
        </div>
      </div>

    </div>

    <ul class="fixed-shortcut-list">
      <li v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
          :class="{'active':currentShortcut===index}"
          @touchstart.stop.prevent="shortcutListTouchStart"
          @touchmove.stop.prevent="shortcutListTouchMove"
      >{{item}}
      </li>
    </ul>

    <div class="fixed-title" v-show="showFixedTitle">{{currentAlpha}}</div>
  </div>
</template>

<script>
  import bus from '../assets/js/bus'
  const HEADER_OFFSET_TOP = 45;
  const SHORTCUT_ITEM_HEIGHT = 20;

  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return [
            {
              avatar: 'http://iph.href.lu/128x128',
              name: '暂时没有数据！'
            }
          ]
        }
      }
    },
    data () {
      return {
        currentShortcut: 0,
        currentAlpha: '热门歌手',
        showFixedTitle: false
      }
    },
    created() {
      // 不定义在data里，因为不需要数据双向绑定
      this.touchDelta = {};
      this.listGroupsHeight = [];
    },
    mounted() {
      // 获取当前列表滚动高度
      bus.$on('singerListScroll', (top) => {
        this.onSingerListScroll(top)
      })
    },
    watch: {
      list() {
        this.$nextTick(()=>{
          this.calculateGroupHeight()
        })
      },
      currentShortcut() {
        this.currentAlpha = this.list[this.currentShortcut].title
      }
    },
    computed: {
      shortcutList(){
        let ret = this.list.map((v)=>{
          return v.title.substring(0,1);
        });
        return ret;
      }
    },
    activated() {
      if (this.currentShortcut>0) {
        this._scrollToSingerType(this.currentShortcut)
      }
    },
    methods: {
      shortcutListTouchStart(evt) {
        let index = parseInt(evt.target.getAttribute('data-index'));
        // this.currentShortcut = index;

        // 计算滚动偏移：Y轴触摸初始量
        this.touchDelta.y1 = evt.touches[0].clientY;
        this.touchDelta.index = index;

        this._scrollToSingerType(index)
      },
      shortcutListTouchMove(evt) {
        // 计算滚动偏移：Y轴触摸移动
        this.touchDelta.y2 = evt.touches[0].clientY;

        let delta = Math.floor((this.touchDelta.y2 - this.touchDelta.y1) / SHORTCUT_ITEM_HEIGHT)

        let index = this.touchDelta.index + delta;

        if (index < 0) {
          index = 0
        } else if (index >= this.shortcutList.length) {
          index = this.shortcutList.length - 1
        }

        // this.currentShortcut = index;
        this._scrollToSingerType(index)
      },
      _scrollToSingerType(index) {
        if (index < 0) {
          index = 0
        }
        // 滚动到指定元素
        this.$refs.singerList.children[index].scrollIntoView();
        document.documentElement.scrollTop -= HEADER_OFFSET_TOP
      },
      // 更新currentShortcut和fixedTitle
      onSingerListScroll(top) {
        // console.log(top)
        const lgh = this.listGroupsHeight;
        if (top <= 0) {
          this.currentShortcut = 0;
        }
        this.showFixedTitle = top >= HEADER_OFFSET_TOP*2

        for (let i=0; i<lgh.length-1; i++) {
          let h1 = lgh[i];
          let h2 = lgh[i+1];

          if (top >= h1 && top <= h2) {
            this.currentShortcut = i;
            return
          }

          this.currentShortcut = lgh.length
        }
      },
      // 计算列表每组的高度
      calculateGroupHeight() {
        this.listGroupsHeight = [];
        let groups = this.$refs.singerListGroup;
        let height = 0;
        this.listGroupsHeight.push(height);

        groups.forEach((v, i) => {
          height += v.clientHeight;
          this.listGroupsHeight.push(height)
        })
        // console.log(this.listGroupsHeight)
      },
      selectSinger(singer) {
        this.$emit('selectSinger', singer);
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../assets/css/theme.styl"
.component-list-view
  padding 0
  .type-title, .fixed-title
    border-top 1px solid $color-bg-dark
    border-bottom 1px solid $color-bg-dark
    line-height: 23px
    padding 5px 10px
    font-weight: bold
    box-sizing border-box
  .list-type
    .list-item
      display flex
      align-items center
      padding 5px 10px
      box-sizing border-box
      &:active
        background $color-bg-dark
      &>img
        height 60px
        width 60px
        border-radius 50%
        margin-right 10px
  .fixed-shortcut-list
    position fixed
    top 50%
    right 0
    transform translateY(-40%)
    padding-right: 1px
    &>li
      width 20px
      height 20px
      line-height: 20px
      text-align center
      border-radius 50%
      font-size 12px
      &.active
        background $color-theme
        color: #fff
  .fixed-title
    position fixed
    top: 44px;
    left 0
    width 100%
    background #fff
    animation fadeIn 0.5s
</style>