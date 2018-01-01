/**
 * Created by zhaojuntong on 2018/1/1.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let templateList = []
let emailList = []

for (let i = 0; i < 20; i++) {
  templateList.push(Mock.mock({
    'id': '@increment',
    'title': '@title',
    'language|1': ['繁体中文', '简体中文', '英文', '韩文'],
    'createTime': '@datetime',
    'content': '@title'
  }))
}
for (let i = 0; i < 60; i++) {
  emailList.push(Mock.mock({
    'id': '@increment',
    'title': '@title',
    'language|1': ['繁体中文', '简体中文', '英文', '韩文'],
    'sendNum': '@integer(30, 130)',
    'sendTime': '@datetime'
  }))
}
export default {
  getEmailList: config => {
    const { page = 1, limit = 10 } = paramObj(config.url)
    const TemplateList = templateList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    const EmailList = emailList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      totalMap: [templateList.length, emailList.length],
      templateList: TemplateList,
      emailList: EmailList,
      code: 2
    }
  },
  emailDetail: config => {
    const emailId = config.url.match(/\d+/)[0] * 1
    const detail = templateList.filter(item => item.id === emailId)[0]
    return {
      emailDetail: detail,
      code: 2
    }
  }
}
