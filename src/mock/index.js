/**
 * Created by zhaojuntong on 2017/12/19.
 */
import Mock from 'mockjs'
import loginAPI from './login'

Mock.mock(/\/login\/login/, 'post', loginAPI.login)

export default Mock
