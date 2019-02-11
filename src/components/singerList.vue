<template>
  <div class="component-list-view">
    <div class="list-scroll">

      <div v-for="(item, index) in list" :key="index" class="list-item">
        <img :src="item.avatar">
        <p>{{item.name}}</p>
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
.component-list-view
  padding 5px 0
  .list-item
    display flex
    align-items center
    padding 5px 10px
    box-sizing border-box
    &>img
      height 60px
      width 60px
      border-radius 50%
      margin-right 10px
</style>