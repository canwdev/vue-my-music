import jsonp from "../assets/js/jsonp"

/**
 * 获取歌曲Vkey
 * @param songmid
 * @returns {Promise<any>}
 */
export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 3051522991,
    guid: 5931742855,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })
  return jsonp(url, data)
}

export function getSongUrl(songmid) {
  return new Promise((resove, reject) => {
    getSongVkey(songmid).then(
      (res)=>{
        let vkey = res.data.items[0].vkey;
        let url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
        resove(url)
      },
      (err)=> {
        reject(err)
      }
    )
  })
}