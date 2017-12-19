/**
 * Created by zhaojuntong on 2017/12/19.
 */
import request from 'utils/request'

export function login(username, password) {
  return request({
    url: '/login/login',
    methods: 'post',
    data: {
      user: username,
      password: password
    }
  })
}
