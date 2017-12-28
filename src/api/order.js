/**
 * Created by zhaojuntong on 2017/12/28.
 */
import request from 'utils/request'

export function getOrderList (listQuery) {
  return request({
    url: '/orderList',
    method: 'get',
    params: listQuery
  })
}
