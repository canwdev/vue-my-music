<template>
  <div class="component-list-view">
    <div class="list-scroll">

      <div class="list-type" v-for="(singerType, index) in list" :key="index">
        <p class="type-title">{{singerType.title}}</p>
        <div class="list-item" v-for="(singer, index) in singerType.items" :key="index">
          <img v-lazy="singer.avatar">
          <p>{{singer.name}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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

      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../assets/css/theme.styl"
.component-list-view
  padding 0
  .list-type
    .type-title
      border-top 1px solid $color-bg-dark
      border-bottom 1px solid $color-bg-dark
      line-height: 23px
      padding 5px 10px
      font-weight: bold
      box-sizing border-box
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
</style>