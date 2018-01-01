/**
 * Created by zhaojuntong on 2018/1/1.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let messageList = []
const count = 100

for (let i = 0; i < count; i++) {
  messageList.push(Mock.mock({
    'id': '@increment',
    'pushTarget': '教练',
    'pushRegion': '部分教练',
    'pushTitle': '@title',
    'pushType|1': ['system', 'normal', 'sodive', 'task', 'production'] /* system => 系统消息 normal => 普通消息 sodive => sodive学院 task => 任务消息 production => 产品消息 */,
    'pushNum': '@integer(1, 15)',
    'pushTime': '@datetime'
  }))
}

export default {
  getMessageList: config => {
    const { page = 1, limit = 10, pushType, sortId } = paramObj(config.url)
    let mockList = messageList.filter(item => {
      if (pushType && item.pushType !== pushType) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      messageList: pageList,
      code: 2
    }
  }
}
