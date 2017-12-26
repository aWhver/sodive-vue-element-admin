/**
 * Created by zhaojuntong on 2017/12/19.
 */
import Mock from 'mockjs'
import loginAPI from './login'
import getAgentListAPI from './userManage/agent'
import getCoachListAPI from './userManage/coach'

Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/userInfo/, 'post', loginAPI.getUserInfo)

// userManage
Mock.mock(/\/userManage\/agentList/, 'get', getAgentListAPI.getAgentList)
Mock.mock(/\/userManage\/addAgent/, 'get', getAgentListAPI.addAgent)
Mock.mock(/\/userManage\/coachList/, 'get', getCoachListAPI.getCoachList)

export default Mock
