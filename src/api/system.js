/**
 * Created by zhaojutong on 2018/1/1.
 */
import request from 'utils/request'

export function getVersionList (listQuery) {
  return request({
    url: 'versionList',
    method: 'get',
    params: listQuery
  })
}

export function getUrlList (listQuery) {
  return request({
    url: 'urlList',
    method: 'get',
    params: listQuery
  })
}

export function getUrlInfo (urlId) {
  return request({
    url: `system/url/${urlId}`,
    method: 'get'
  })
}

export function createUrl (data) {
  return request({
    url: `system/url/createUrl`,
    method: 'get',
    data
  })
}
