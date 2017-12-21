/**
 * Created by zhaojuntong on 2017/12/19.
 */
import { paramObj } from 'utils/index'
import { getToken } from 'utils/auth'
const userInfo = {
  'admin': {
    roles: ['admin'],
    token: 'admin',
    introduction: '超级管理员',
    name: 'zhaojuntong',
    avatar: '/static/avatar.gif'
  }
}
export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    const ExpiresToken = getToken('Expires-Token')
    const nowDate = new Date().getTime()
    let code = 2 // the code express token is valid
    if (nowDate - ExpiresToken > 7 * 24 * 3600 * 1000) {
      code = 0 // the code express token is invalid
      localStorage.removeItem('isLogin')
    } else if (username !== 'admin') {
      code = 1 // the code express token is wrong
    }
    return {
      ...userInfo[username],
      code
    }
  },
  getUserInfo: config => {
    const { token } = paramObj(config.url)
    let code
    if (userInfo[token]) {
      code = 2
      return {
        ...userInfo[token],
        code
      }
    } else {
      code = 1
      return {
        code
      }
    }
  }
}
