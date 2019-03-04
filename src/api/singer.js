import jsonp from '../assets/js/jsonp'
import {commonParams, options} from "./config"

/**
 * 获取歌手列表
 */
export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}


/**
 * 获取歌手的歌曲
 * @param singerId
 * @returns {Promise<any>}
 */
export function getSingerDetail(singerId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    paltform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songsstatus: 1,
    singermid: singerId,
    g_tk: 1664029744
  })

  return jsonp(url, data, options)
}