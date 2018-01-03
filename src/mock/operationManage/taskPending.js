/**
 * Created by zhaojuntong on 2018/1/2.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let taskList = []
const count = 100

for (let i = 0; i < count; i++) {
  taskList.push(Mock.mock({
    'id': '@increment',
    'taskName': '@ctitle',
    'userId': 'C@integer(10000, 99999)',
    'nickName': '@first',
    'submitTime': '@datetime',
    'taskContent|2-3': ['您绑定的用户在活动期间购买了潜伴灯', '用户确认收货后15天内未发生退货：用户确认收货后15天内未发生退货，您可领取潜伴灯免费兑换券一张!', '分享商品详情：分享商品详情'],
    'status|1': ['pending', 'pended', 'failed'],
    'refuseReason': '@title'
  }))
}

let taskManage = []
for (let i = 0; i < 15; i++) {
  taskManage.push(Mock.mock({
    'taskId': '@date(T)',
    'taskName': '@ctitle',
    'createTime': '@datetime',
    'updateTime': undefined,
    'showRegion|1': ['all', 'China', 'abroad'],
    'subTask|1-2': [
      {'subTaskId': '@date(T)', 'subTaskName': '您的绑定用户在活动期间购买了潜伴灯', 'taskDescription': '@ctitle', 'subStatus|1': ['effective', 'ineffective']},
      {'subTaskId': '@date(T)', 'subTaskName': '您的绑定用户已完成订单', 'taskDescription': '@ctitle', 'subStatus|1': ['effective', 'ineffective']},
      {'subTaskId': '@date(T)', 'subTaskName': '用户确认收货后15天内未发生退货', 'taskDescription': '@ctitle', 'subStatus|1': ['effective', 'ineffective']}
    ],
    'status|1': ['effective', 'ineffective'],
    'userNumberRecord|10-50': [ /* 该任务参与的user数量 */
      {'userId': '@integer(10000, 99999)', 'nickName': '@first', 'submitTime': '@datetime', 'refuseReason': '@ctitle', 'status|1': ['pending', 'pended', 'failed']}
    ]
  }))
}

export default {
  getTaskList: config => {
    const { page = 1, limit = 10, userId, type, sortId } = paramObj(config.url)
    let mockList = taskList.filter(item => {
      if (type && type !== item.status) return false
      if (userId && userId !== item.userId) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      taskList: pageList,
      code: 2
    }
  },
  taskManage: config => {
    const { page = 1, limit = 10 } = paramObj(config.url)
    const pageList = taskManage.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      taskManage: pageList,
      total: taskManage.length,
      code: 2
    }
  },
  userNumberRecord: config => {
    // const taskId = config.url.match(/\d+/)[0]
    const { page = 1, limit = 10, userId, sortId, taskId } = paramObj(config.url)
    let filteredTask = taskManage.filter(item => item.taskId === taskId)[0]
    const taskName = filteredTask.taskName // 当前任务名称
    let recordNum = filteredTask.userNumberRecord.map(item => { /* 当前任务所参与的user number */
      item.taskName = taskName
      return item
    })
    let filteredList = recordNum.filter(item => {
      if (userId && (userId * 1) !== item.userId) return false
      return true
    })
    if (sortId === '-id') filteredList = filteredList.reverse()
    const pageList = filteredList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      taskName: taskName,
      recordList: pageList,
      total: filteredList.length,
      code: 2
    }
  }
}
