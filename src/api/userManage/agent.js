/**
 * Created by zhaojuntong on 2017/12/25.
 */
import request from 'utils/request'

export function getAgentList (listQuery) {
  return request({
    url: '/userManage/agentList',
    method: 'get',
    params: listQuery
  })
}
