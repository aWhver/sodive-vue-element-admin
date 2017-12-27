/**
 * Created by zhaojuntong on 2017/12/26.
 */
import Mock from 'mockjs'
import { paramObj, randomColor } from 'utils/index'

let coachList = []
const count = 100

for (let i = 0; i < count; i++) {
  coachList.push(Mock.mock({
    'id': '@increment',
    userId: 'C@integer(10000, 99999)',
    nickName: '@first',
    'countryName|1': ['cn', 'us', 'nsl'],
    point: '@integer(0, 1000)',
    registerTime: '@datetime',
    email: '@email',
    'certificate|1': ['未上传', '已上传,待审核', '已认证', '未通过'],
    bindUser: '@integer(0, 100)',
    'agent|1': 'A@integer(10000, 99999)',
    'status|1': '@integer(0, 1)',
    'sex|1': ['male', 'female', 'unknow'],
    'phoneNo|1': ['13798254451', '18873283031', '13578941256', '18163910930', '15678941273'],
    'coachAvatar': `@image(60x60, ${randomColor()}, sodive)`
  }))
}

export default {
  getCoachList: config => {
    const { page = 1, limit = 10, email, userId, countryName, nickName, phoneNo, sortId } = paramObj(config.url)
    let mockList = coachList.filter(item => {
      if (email && email !== item.email) return false
      if (userId && userId !== item.userId) return false
      if (countryName && countryName !== item.countryName) return false
      if (nickName && nickName !== item.nickName) return false
      if (phoneNo && phoneNo !== item.phoneNo) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      coachList: pageList,
      code: 2
    }
  }
}
