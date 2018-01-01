/**
 * Created by zhaojuntong on 2017/12/31.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let coverList = []
const count = 100

for (let i = 0; i < count; i++) {
  coverList.push(Mock.mock({
    'id': '@increment',
    'image': '@image(50x50, @color, @string)',
    'position': '@county(true)',
    'userId': '@integer(1000000, 9999999)',
    'uploadTime': '@datetime',
    'status': '@integer(0, 2)' /* 0 => 未通过 1 => 待审核 2 => 通过 */
  }))
}

export default {
  getCoverList: config => {
    const { page = 1, limit = 10, type, userId, sortId } = paramObj(config.url)
    let mockList = coverList.filter(item => {
      if (userId && userId * 1 !== item.userId) return false
      // if (type === undefined) return true
      if ((type + '') && (type * 1) !== item.status) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      coverList: pageList,
      code: 2
    }
  }
}
