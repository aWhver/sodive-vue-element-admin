/**
 * Created by zhaojuntong on 2017/12/19.
 */
import Mock from 'mockjs'
import loginAPI from './login'
import getAgentListAPI from './userManage/agent'
import getCoachListAPI from './userManage/coach'
import getUserListAPI from './userManage/user'
import getCoachCertificateListAPI from './userManage/coachCertificate'
import getPayAccountListAPI from './userManage/payAccount'

Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/userInfo/, 'post', loginAPI.getUserInfo)

// userManage
Mock.mock(/\/userManage\/agentList/, 'get', getAgentListAPI.getAgentList)
Mock.mock(/\/userManage\/addAgent/, 'get', getAgentListAPI.addAgent)
Mock.mock(/\/userManage\/coachList/, 'get', getCoachListAPI.getCoachList)
Mock.mock(/\/userManage\/userList/, 'get', getUserListAPI.getUserList)
Mock.mock(/\/userManage\/coachCertificateList/, 'get', getCoachCertificateListAPI.getCertificateList)
Mock.mock(/\/userManage\/payAccountList/, 'get', getPayAccountListAPI.getCertificateList)

export default Mock
