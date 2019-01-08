import originJsonp from 'jsonp'
// https://github.com/webmodules/jsonp

/**
 * 封装的Promise JSONP，可以实现跨域请求
 * @param url
 * @param data
 * @param option
 * @returns {Promise<any>}
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?')<0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject)=> {
    originJsonp(url, option, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 拼接url参数
function param(data) {
  let url = ''

  for (let i in data) {
    let value = data[i] !== 'undefined'? data[i] : ''
    url += `&${i}=${encodeURIComponent(value)}`
  }

  return url ? url.substring(1) : ''
}