export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url, songmid}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: singerFilter(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
  })
}

function singerFilter(singer) {
  let ret = [];
  if (!singer) {
    return ''
  }

  singer.forEach((v) => {
    ret.push(v.name)
  })

  return ret.join('/')
}