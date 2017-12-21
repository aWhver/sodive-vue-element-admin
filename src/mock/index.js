/**
 * Created by zhaojuntong on 2017/12/19.
 */
import Mock from 'mockjs'
import loginAPI from './login'

Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/userInfo/, 'post', loginAPI.getUserInfo)
export default Mock
