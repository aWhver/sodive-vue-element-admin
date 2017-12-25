/**
 * Created by zhaojuntong on 2017/12/25.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let agentList = []
const count = 100

for (let i = 0; i < count; i++) {
  agentList.push(Mock.mock({
    id: '@increment',
    agentId: 'A@integer(10000, 99999)',
    nickName: '@name',
    point: '@integer(100, 999)',
    registerTime: '@datetime',
    ownCoach: '@integer(0, 100)',
    email: '@email',
    'sex|1': ['male', 'female', 'unknow'],
    'phoneNo|1': ['13798254451', '18873283031', '13578941256', '18163910930', '15678941273'],
    'countryName|1': ['cn', 'us', 'nsl'],
    'status|1': '@integer(0, 1)'
  }))
}

export default {
  getAgentList: config => {
    let { page = 1, limit = 10, agentId, nickName, phoneNo, email, countryName, sortId } = paramObj(config.url)
    if (nickName) nickName = nickName.replace(/\+/, ' ')
    let mockList = agentList.filter(item => {
      if (agentId && item.agentId !== agentId) return false
      if (nickName && item.nickName !== nickName) return false
      if (phoneNo && item.phoneNo !== phoneNo) return false
      if (email && item.email !== email) return false
      if (countryName && item.countryName !== countryName) return false
      return true
    })

    if (sortId === '-id') mockList = mockList.reverse()

    const filterAgentList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 2,
      total: mockList.length,
      agentList: filterAgentList
    }
  }
}
