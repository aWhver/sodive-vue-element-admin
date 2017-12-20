/**
 * Created by zhaojuntong on 2017/12/19.
 */
import request from 'utils/request'

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}
