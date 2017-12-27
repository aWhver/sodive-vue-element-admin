/**
 * Created by zhaojuntong on 2017/12/27.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let payAccountList = []
const count = 100

for (let i = 0; i < count; i++) {
  payAccountList.push(Mock.mock({
    'id': '@increment',
    'userId': '@character(AC)@integer(10000, 99999)',
    'userType|1': ['合伙人', '教练', '普通用户'],
    'payType': '@integer(0, 2)', /* 0 => alipay, 1 => wechat, 2 => paypal */
    'account': '@integer(1114511, 9456489745)@qq.com',
    'name': '@first',
    'createTime': '@datetime(yyyy-MM-dd)',
    'modifyTime': '@datetime(yyyy-MM-dd)',
    'status|1': '@integer(0 ,1)' /* 0 => 正常, 1 => 失效 */
  }))
}

export default {
  getPayAccountList: config => {
    const { page = 1, limit = 10, userId, name, payType, sortId } = paramObj(config.url)

    let mockList = payAccountList.filter(item => {
      if (userId && item.userId !== userId) return false
      if (name && item.name !== name) return false
      if (payType === undefined) return true
      if ((payType + '') && item.payType !== (payType * 1)) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      payAccountList: pageList,
      code: 2
    }
  }
}
