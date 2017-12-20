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
    config.headers['X-Token'] = getToken() // 请求携带token
  }
  return config
}, error => {
  Promise.reject(error)
})

// response 拦截
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.data,
      type: 'error',
      duration: 5000
    })

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('你已被登出,或在其他客户端登录,或者重新登陆', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(1) // TODO
      })
    }
    return Promise.resolve('error')
  } else {
    return res
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
