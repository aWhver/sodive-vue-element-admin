/**
 * Created by zhaojuntong on 2017/12/21.
 */
export function paramObj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, ',').replace(/=/g, '":"') + '"}')
}
