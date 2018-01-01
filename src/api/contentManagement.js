/**
 * Created by zhaojuntong on 2017/12/31.
 */
import request from 'utils/request'

export function getCoverList (listQuery) {
  return request({
    url: 'contentManagement/coverList',
    method: 'get',
    params: listQuery
  })
}
