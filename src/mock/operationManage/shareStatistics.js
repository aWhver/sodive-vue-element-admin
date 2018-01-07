/**
 * Created by zhaojuntong on 2018/1/6.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let statisticsList = [] // 分享统计
let detailList = [] // 分享详情
const count = 50

const Week = Date.now() - 7 * 24 * 3600 * 1000
const Month = Date.now() - 30 * 24 * 3600 * 1000
const QuarterYear = Date.now() - 90 * 24 * 3600 * 1000
const HalfYear = Date.now() - 180 * 24 * 3600 * 1000
const Year = Date.now() - 365 * 24 * 3600 * 1000

for (let i = 0; i < count; i++) {
  statisticsList.push(Mock.mock({
    'shareContent': '@ctitle',
    'facebook': '@integer(10, 100)',
    'wechatMoments': '@integer(10, 100)',
    'wechat': '@integer(10, 100)',
    'twitter': '@integer(10, 100)',
    'browseNum': '@integer(100, 400)',
    'shareTimeStamp|1': [Week, Month, QuarterYear, HalfYear, Year]
  }))

  detailList.push(Mock.mock({
    'coachId': 'C@integer(10000, 99999)',
    'nickName': '@first',
    'shareType|1': ['商品', '推荐码'],
    'shareNum': '@integer(100, 300)',
    'browseNum': '@integer(200, 400)',
    'shareChannel|1': ['facebook', 'wechatMoments', 'wechat', 'twitter'],
    'shareTimeStamp|1': [Week, Month, QuarterYear, HalfYear, Year]
  }))
}

export default {
  getStatisticsList: config => {
    const { page = 1, limit = 10, timeCircle } = paramObj(config.url)
    const nowDateTimeStamp = Date.now()
    let mockList = statisticsList.filter(item => {
      if (timeCircle) {
        switch (timeCircle) {
          case 'week':
            if ((nowDateTimeStamp - item.shareTimeStamp) > 7 * 24 * 3600 * 1000) return false
            break
          case 'month':
            if ((nowDateTimeStamp - item.shareTimeStamp) > 30 * 24 * 3600 * 1000) return false
            break
          case 'quarterYear':
            if ((nowDateTimeStamp - item.shareTimeStamp) > 90 * 24 * 3600 * 1000) return false
            break
          case 'halfYear':
            if ((nowDateTimeStamp - item.shareTimeStamp) > 180 * 24 * 3600 * 1000) return false
            break
          case 'year':
            if ((nowDateTimeStamp - item.shareTimeStamp) > 365 * 24 * 3600 * 1000) return false
            break
        }
      }
      return true
    })
    const pageList = mockList.filter((item, index) => index < page * limit && index >= limit * (page - 1))
    return {
      total: mockList.length,
      statisticsList: pageList,
      code: 2
    }
  },
  getDetailList: config => {
    const { page = 1, limit = 10, shareChannel, coachId, sortId } = paramObj(config.url)
    let startDate
    let endDate
    // 点击el-date-picker组件清除按钮时, 传过来的是null
    if (JSON.parse(config.body) !== null && JSON.parse(config.body).length !== 0) {
      const dateMap = JSON.parse(config.body)
      startDate = new Date(dateMap[0]).getTime()
      endDate = new Date(dateMap[1]).getTime()
    }

    let mockList = detailList.filter(item => {
      if (shareChannel && shareChannel !== item.shareChannel) return false
      if (coachId && coachId !== item.coachId) return false
      if (JSON.parse(config.body) !== null && JSON.parse(config.body).length !== 0 && !(startDate < item.shareTimeStamp && endDate > item.shareTimeStamp)) return false
      return true
    })
    if (sortId === '-id') mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      detailList: pageList,
      code: 2
    }
  }
}
