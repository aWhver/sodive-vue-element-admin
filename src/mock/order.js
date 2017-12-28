/**
 * Created by zhaojuntong on 2017/12/28.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let orderList = []
const count = 100

for (let i = 0; i < count; i++) {
  orderList.push(Mock.mock({
    'id': '@increment',
    'orderNo': '150@integer(1000000, 9999999)',
    'userId': 'C@integer(10000, 99999)',
    'nickName': '@first',
    'phoneNo': '1@integer(3, 8)@integer(4, 9)@integer(10000000, 99999999)',
    'payType': '兑换券',
    'createTime': '@datetime',
    'updateTime': '@datetime',
    'goodsPic': "@image(80 x 80, @color, 'sodive')",
    'receiver': '@cname',
    'receiveAddress': '@province',
    'logisticsStatus': '@integer(0, 4)' /* 0 => 无物流, 1 =>  待发货, 2 => 配送中, 3 => 已签收, 4 => 拒签收  */
  }))
}

export default {
  getOrderList: config => {
    const { page = 1, limit = 10, orderNo, userId, sortId } = paramObj(config.url)
    let mockList = orderList.filter(item => {
      if (orderNo && orderNo !== item.orderNo) return false
      if (userId && userId !== item.userId) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      orderList: pageList,
      total: mockList.length,
      code: 2
    }
  }
}
