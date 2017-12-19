/**
 * Created by zhaojuntong on 2017/12/19.
 */
import axios from 'axios'

const request = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

export default request
