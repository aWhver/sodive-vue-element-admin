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
import getOrderListAPI from './order'
import getExchangeListAPI from './exchange/exchange'
import getCoverListAPI from './contentManagement/contentManagement'
import getEmailListAPI from './tools/massiveEmail'
import getMessageListAPI from './tools/messageNotification'
import getVersionListAPI from './system/system'
import getTaskListAPI from './operationManage/taskPending'
import operationManageAPI from './operationManage/operationManage'

Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/userInfo/, 'post', loginAPI.getUserInfo)

// userManage
Mock.mock(/\/userManage\/agentList/, 'get', getAgentListAPI.getAgentList)
Mock.mock(/\/userManage\/addAgent/, 'get', getAgentListAPI.addAgent)
Mock.mock(/\/userManage\/coachList/, 'get', getCoachListAPI.getCoachList)
Mock.mock(/\/userManage\/userList/, 'get', getUserListAPI.getUserList)
Mock.mock(/\/userManage\/coachCertificateList/, 'get', getCoachCertificateListAPI.getCertificateList)
Mock.mock(/\/userManage\/payAccountList/, 'get', getPayAccountListAPI.getPayAccountList)

// order
Mock.mock(/\/orderList/, 'get', getOrderListAPI.getOrderList)

// exchange
Mock.mock(/\/exchangeList/, 'get', getExchangeListAPI.getExchangeList)
Mock.mock(/\/exchange\/\d+/, 'get', getExchangeListAPI.detail)

// contentManagement
Mock.mock(/\/contentManagement\/coverList/, 'get', getCoverListAPI.getCoverList)

// operationManage
Mock.mock(/\/operationManage\/taskList/, 'get', getTaskListAPI.getTaskList)
Mock.mock(/\/operationManage\/taskManage/, 'get', getTaskListAPI.taskManage)
Mock.mock(/\/operationManage\/userNumberRecord\/\d+/, 'get', getTaskListAPI.userNumberRecord)
Mock.mock(/\/operationManage\/addTask/, 'get', getTaskListAPI.addTask)
Mock.mock(/\/operationManage\/editTask\/\d+/, 'get', getTaskListAPI.editTask)
Mock.mock(/\/operationManage\/recommendProduction/, 'get', operationManageAPI.getRecommendProduction)
Mock.mock(/\/operationManage\/addProduction/, 'get', operationManageAPI.addProduction)
Mock.mock(/\/operationManage\/sodiveList/, 'get', operationManageAPI.getSodiveList)
Mock.mock(/\/operationManage\/editSodive\/\d+/, 'get', operationManageAPI.editSodive)
Mock.mock(/\/operationManage\/getSodive\/\d+/, 'get', operationManageAPI.getSodive)

// tools
Mock.mock(/\/massiveEmail\/emailList/, 'get', getEmailListAPI.getEmailList)
Mock.mock(/\/massiveEmail\/\d+/, 'get', getEmailListAPI.emailDetail)
Mock.mock(/\/messageList/, 'get', getMessageListAPI.getMessageList)

// system
Mock.mock(/\/versionList/, 'get', getVersionListAPI.getVersionList)
Mock.mock(/\/urlList/, 'get', getVersionListAPI.getUrlList)
Mock.mock(/\/system\/url\/(\d+)-([A-Z]+)-(\d+)/, 'get', getVersionListAPI.getUrlInfo)
Mock.mock(/\/system\/url\/createUrl/, 'get', getVersionListAPI.createUrl)
export default Mock
