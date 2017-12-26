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

export function addAgent (agentId, countryName, email) {
  const data = {
    agentId: agentId,
    countryName: countryName,
    email: email
  }
  return request({
    url: '/userManage/addAgent',
    method: 'get',
    data
  })
}

export function getCoachList (listQuery) {
  return request({
    url: '/userManage/coachList',
    method: 'get',
    params: listQuery
  })
}

export function getUserList (listQuery) {
  return request({
    url: '/userManage/userList',
    method: 'get',
    params: listQuery
  })
}
