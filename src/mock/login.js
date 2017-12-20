/**
 * Created by zhaojuntong on 2017/12/19.
 */
const user = {
  'admin': {
    role: ['admin'],
    token: 'admin',
    introduction: '超级管理员',
    name: 'zhaojuntong',
    avatar: '/static/avatar.gif'
  }
}
export default {
  login: config => {
    console.log(config)
    const { username } = JSON.parse(config.body)
    return user[username]
  }
}
