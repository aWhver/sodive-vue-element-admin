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
