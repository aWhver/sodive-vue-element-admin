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
export function addTask (taskForm) {
  return request({
    url: 'operationManage/addTask',
    method: 'get',
    data: taskForm
  })
}

export function editTask (taskId) {
  return request({
    url: `operationManage/editTask/${taskId}`,
    method: 'get',
    data: taskId
  })
}

export function getRecommendProduction (listQuery) {
  return request({
    url: `operationManage/recommendProduction`,
    method: 'get',
    params: listQuery
  })
}

export function addProduction (productionForm) {
  return request({
    url: `operationManage/addProduction`,
    method: 'get',
    data: productionForm
  })
}

export function getSodiveList (listQuery) {
  return request({
    url: 'operationManage/sodiveList',
    method: 'get',
    params: listQuery
  })
}

export function editSodive (sodiveForm, routeId) {
  return request({
    url: `operationManage/editSodive/${routeId}`,
    method: 'get',
    data: { sodiveForm, routeId }
  })
}

export function getSodive (routeId) {
  return request({
    url: `operationManage/getSodive/${routeId}`,
    method: 'get',
    data: { routeId }
  })
}
