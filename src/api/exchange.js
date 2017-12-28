/**
 * Created by zhaojuntong on 2017/12/28.
 */
import request from 'utils/request'

export function getExchangeList (listQuery) {
  return request({
    url: '/exchangeList',
    method: 'get',
    params: listQuery
  })
}
