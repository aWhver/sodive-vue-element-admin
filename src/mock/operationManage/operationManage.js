/**
 * Created by zhaojuntong on 2018/1/4.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let recommendProduction = []
const count = 100

for (let i = 0; i < count; i++) {
  recommendProduction.push(Mock.mock({
    'id': '@increment',
    'productionNo': '2018@integer(1000000, 9999999)',
    'productionName': '@ctitle',
    'productionImage|2-3': [{'name': '@string', 'url': '@image(50x50, @color, "sodive")'}],
    'coachProfit': '@integer(10, 100)',
    'recommend|1': [true, false],
    'effective|1': [true, false],
    'shareNum': '@integer(40, 100)',
    'buyNum': '@integer(20, 40)',
    'showRegion|1': ['all', 'China', 'abroad'],
    'buyUrl': '@url("http", "shopcn.sodive.com/Mobile")',
    'shareIntroduce': '@title',
    'detail': '@title'
  }))
}

export default {
  getRecommendProduction: config => {
    const { page = 1, limit = 10, sortId, productionName } = paramObj(config.url)
    let mockList = recommendProduction.filter(item => {
      if (productionName && productionName !== item.productionName) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      recommendProduction: pageList,
      code: 2
    }
  },
  addProduction: config => {
    recommendProduction.unshift(JSON.parse(config.body))
    return {
      info: 'success',
      code: 2
    }
  }
}
