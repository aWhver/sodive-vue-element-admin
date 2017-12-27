/**
 * Created by zhaojuntong on 2017/12/27.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let certificateList = []
const count = 150

for (let i = 0; i < count; i++) {
  certificateList.push(Mock.mock({
    'id': '@increment',
    'userId': 'C@integer(10000, 99999)',
    'nickName': '@first',
    'userType': '潜水教练',
    'name': '@last',
    'institution': '@string(3, 5)',
    'getCertificateTime': '@datetime(yyyy-MM-dd)',
    'submitCertificateTime': '@datetime(yyyy-MM-dd)',
    'status|1': '@integer(0, 2)'
  }))
}

export default {
  getCertificateList: config => {
    const { page = 1, limit = 10, userId, name, sortId, type } = paramObj(config.url)
    let list = certificateList.filter(item => {
      if (userId && item.userId !== userId) return false
      if (name && item.name !== name) return false
      if ((type + '') && item.status !== (type * 1)) {
        return false
      }
      return true
    })
    if (sortId === '-id') {
      list = list.reverse()
    }
    const pageList = list.filter((item, index) => index < page * limit && index >= limit * (page - 1))
    return {
      total: list.length,
      certificateList: pageList,
      code: 2
    }
    /* let pendingList = certificateList.filter(item => item.status === 0)
    let pendedList = certificateList.filter(item => item.status === 1)
    let failedList = certificateList.filter(item => item.status === 2)
    if (sortId === '-id') {
      pendingList = pendingList.reverse()
      pendedList = pendedList.reverse()
      failedList = failedList.reverse()
    }
    const returnPendingList = pendingList.filter((item, index) => index < page * limit && index >= limit * (page - 1))
    const returnPendedList = pendedList.filter((item, index) => index < page * limit && index >= limit * (page - 1))
    const returnFailedList = failedList.filter((item, index) => index < page * limit && index >= limit * (page - 1))
    return {
      pending: {
        total: pendingList.length,
        list: returnPendingList
      },
      pended: {
        total: pendedList.length,
        list: returnPendedList
      },
      failed: {
        total: failedList.length,
        list: returnFailedList
      },
      code: 2
    } */
  }
}
/*
dataList: [
  {total: pendingList.length, list: returnPendingList, label: '待审核', name: 'pending'},
  {total: pendedList.length, list: returnPendedList, label: '已审核', name: 'pended'},
  {total: failedList.length, list: returnFailedList, label: '审核失败', name: 'failed'}
], */
