/**
 * Created by zhaojuntong on 2018/1/7.
 */
import Mock from 'mockjs'
import { paramObj, formatTimeCustom } from 'utils/index'

let bannerList = []
const count = 30

for (let i = 0; i < count; i++) {
  bannerList.push(Mock.mock({
    'id': '@increment',
    'title': '@ctitle',
    'banner': [{'name': '@string', 'url': '@image(100x65, @color, sodive)'}],
    'url': '@url(http)',
    'effective|1': ['effective', 'ineffective'],
    'type|1': ['user', 'pro'],
    'createTime': '@datetime(yyyy-MM-dd)'
  }))
}

export default {
  getBannerList: config => {
    const { page = 1, limit = 10, sortId, title } = paramObj(config.url)
    let mockList = bannerList.filter(item => {
      if (title && title !== item.title) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      bannerList: pageList,
      code: 2
    }
  },
  editBanner: config => {
    const data = JSON.parse(config.body)
    if (data.id) {
      bannerList.forEach((item, index) => {
        if (item.id === data.id) {
          bannerList.splice(index, 1, data)
        }
      })
    } else {
      bannerList.unshift(Mock.mock({
        'id': '@increment',
        'title': data.title,
        'banner': data.banner,
        'url': data.url,
        'effective': data.effective,
        'type': data.type,
        'createTime': formatTimeCustom(new Date(), '{y}-{m}-{d}')
      }))
    }
    return {
      code: 2
    }
  }
}
