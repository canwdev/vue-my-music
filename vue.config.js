const axios = require('axios')

module.exports = {
  baseUrl: './',
  productionSourceMap: false,
  devServer: {
    before(app) {
      app.get('/api/getSongList', (req, res) => {
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
          headers: {  // 伪造请求头，以获取歌单数据
            refer: 'https://y.qq.com',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((resp) => {
          res.json(resp.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}