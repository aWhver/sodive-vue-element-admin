/**
 * Created by zhaojuntong on 2017/12/26.
 */
import Mock from 'mockjs'
import { paramObj, randomColor } from 'utils/index'

let userList = []
const count = 100

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    'id': '@increment',
    'userId': '@integer(100000, 999999)',
    'nickName': '@first',
    'countryName|1': ['cn', 'us', 'nsl'],
    'certificate|1': ['未上传', '已上传,待审核', '已认证', '未通过'],
    'registerTime': '@datetime',
    'recommendNum': '@integer(0, 100)',
    'recommendName': '@integer(100000, 999999)',
    'ownCoach': 'C@integer(10000, 99999)',
    'status|1': '@integer(0, 1)',
    'sex|1': ['male', 'female', 'unknow'],
    'email': '@email',
    'phoneNo|1': ['13798254451', '18873283031', '13578941256', '18163910930', '15678941273'],
    'coachAvatar': `@image(60x60, ${randomColor()}, sodive)`,
    'image|2-3': ['@image']
  }))
}

export default {
  getUserList: config => {
    const { page = 1, limit = 10, email, userId, countryName, nickName, phoneNo, sortId } = paramObj(config.url)
    let mockList = userList.filter(item => {
      if (email && email !== item.email) return false
      if (userId && userId !== item.userId + '') return false
      if (countryName && countryName !== item.countryName) return false
      if (nickName && nickName !== item.nickName) return false
      if (phoneNo && phoneNo !== item.phoneNo) return false
      return true
    })
    if (sortId === '-id') mockList = mockList.reverse()
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      userList: pageList,
      code: 2
    }
  }
}
