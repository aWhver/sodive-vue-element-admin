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
  }
}
