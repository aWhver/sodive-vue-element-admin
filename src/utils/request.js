/**
 * Created by zhaojuntong on 2017/12/19.
 */
import axios from 'axios'
import store from '../store'
import { getToken } from 'utils/auth'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截请求
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 请求携带token X-Token为自定义的key
  }
  return config
}, error => {
  Promise.reject(error)
})

// response 拦截
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) { // 不为0为异常状态码
    // 0:token 过期;  1:token(用户名) 不合法
    const promptMap = ['你已被登出,令牌失效', '你已被登出,用户名错误']

    MessageBox.confirm(promptMap[res.code], {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('Logout').then(() => {
        location.reload() // 重新实例化vue-router对象,避免bug
      })
    })
    return Promise.resolve('error')
  } else {
    return response
  }
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5000
  })
  return Promise.reject(error)
})

export default service
