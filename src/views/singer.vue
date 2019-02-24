<template>
  <div class="view-singer">
    <singer-list :list="singers"></singer-list>
  </div>
</template>

<script>
  import {getSingerList} from "../api/recommend"
  import singerList from '../components/singerList'

  class Singer {
    constructor({id, name}) {
      this.id = id;
      this.name = name;
      this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`;
    }
  }

  export default {
    components: {
      singerList
    },
    created() {
      this._getSingerList()
    },
    data() {
      return {
        singers: []
      }
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          console.log('_getSingerList', res)
          if (res.code === 0) {
            let list = res.data.list;
            this.singers = this.normalizeSingerList(list)
          }
        })
      },
      normalizeSingerList(list) {
        const HOT_NAME = '热门歌手';
        const HOT_COUNT = 10;
        let sMap = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((v, i) => {
          // 热门歌手列表
          if (i < HOT_COUNT) {
            sMap.hot.items.push(new Singer({
              id: v.Fsinger_mid,
              name: v.Fsinger_name
            }))
          }

          // 创建拼音列表
          const fKey = v.Findex;
          if (!sMap[fKey]) {
            sMap[fKey] = {
              title: fKey,
              items: []
            }
          }

          // 写入列表数据
          sMap[fKey].items.push(new Singer({
            id: v.Fsinger_mid,
            name: v.Fsinger_name
          }))
        })

        // console.log(sMap)

        // 排序：热门、A、B、C...
        let hotList = [];
        let fList = [];
        for (let i in sMap) {
          let v = sMap[i];
          if (v.title.match(/[a-zA-Z]/)) {
            fList.push(v)
          } else if (v.title === HOT_NAME) {
            hotList.push(v)
          }
        }
        fList.sort((a,b)=>{
          return a.title.charCodeAt(0)-b.title.charCodeAt(0)
        })

        return hotList.concat(fList);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/css/theme.styl"
</style>
