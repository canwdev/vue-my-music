const axios = require('axios')

module.exports = {
  baseUrl: './',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    before(app) {
      app.get('/api/getDiscList', (req, res) => {
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
          headers: {  // 伪造请求头，以获取歌单数据
            referer: 'https://y.qq.com',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((resp) => {
          res.json(resp.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      app.get('/api/getLyric', (req, res) => {
        let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          let ret = response.data

          if (typeof ret === 'string') {
            let reg = /^\w+\(({[^()]+})\)$/
            let matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }

          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      })

    }
  }
}