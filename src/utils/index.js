/**
 * Created by zhaojuntong on 2017/12/21.
 */
export function paramObj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function formatTime () {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  const second = new Date().getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function randomColor () {
  return '#' + (function (color) {
    return new Array(7 - color.length).join('0') + color
  })((Math.random() * 0x1000000 << 0).toString(16))
}
