/**
 * Created by zhaojuntong on 2018/1/2.
 */
import request from 'utils/request'

export function getTaskList (listQuery) {
  return request({
    url: 'operationManage/taskList',
    method: 'get',
    params: listQuery
  })
}

export function taskManage (listQuery) {
  return request({
    url: 'operationManage/taskManage',
    method: 'get',
    params: listQuery
  })
}

export function userNumberRecord (listQuery) {
  return request({
    url: `operationManage/userNumberRecord/${listQuery.taskId}`,
    method: 'get',
    params: listQuery
  })
}
