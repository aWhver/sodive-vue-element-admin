/**
 * Created by zhaojuntong on 2017/12/28.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let exchangeList = []
const count = 100

for (let i = 0; i < count; i++) {
  exchangeList.push(Mock.mock({
    'id': '@increment',
    'goodsId': '2017@integer(1000000000, 9999999999)',
    'goodsName|1': ['液体硅胶面镜', '全铝合金面镜', '双色潜水摄影手电', '炫彩叮叮棒', '潜水面镜手电', 'BuddyLight', '炫彩潜水手电', '炫彩潜水手电', '智能潜伴灯 | 定制版', '智能潜伴灯'],
    'brand': 'HiBuddy',
    'price': '@integer(50, 130)',
    'createTime': '@datetime',
    'updateTime': '@datetime',
    'status': '@integer(0, 1)'
  }))
}

export default {
  getExchangeList: config => {
    const { page = 1, limit = 10, goodsId, goodsName, sortId } = paramObj(config.url)
    let mockList = exchangeList.filter(item => {
      if (goodsId && goodsId !== item.goodsId) return false
      if (goodsName && goodsName !== item.goodsName) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      exchangeList: pageList,
      code: 2
    }
  }
}
