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
