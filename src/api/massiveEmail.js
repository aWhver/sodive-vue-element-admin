/**
 * Created by zhaojuntong on 2018/1/1.
 */
import request from 'utils/request'

export function getMassiveList (listQuery) {
  return request({
    url: 'massiveEmail/emailList',
    method: 'get',
    params: listQuery
  })
}

export function emailDetail (emailId) {
  return request({
    url: `massiveEmail/${emailId}`,
    method: 'get'
  })
}

export function getMessageList (listQuery) {
  return request({
    url: 'messageList',
    method: 'get',
    params: listQuery
  })
}
