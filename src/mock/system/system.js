/**
 * Created by zhaojuntong on 2018/1/1.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let versionList = []
let urlList = []
const count = 10

for (let i = 0; i < count; i++) {
  versionList.push(Mock.mock({
    'id': '@increment',
    'systemType': '@integer(0, 1)', /* 0 => 教练版 1 => 用户版 */
    'systemName|1': ['sodive', 'sodibePRO'],
    'applicationType': '@integer(0, 1)', /* 0 => Android 1 => IOS */
    'version': '@integer(1, 2).@integer(0, 1).@integer(0, 9)',
    'forceUpdate|1': '@integer(0, 1)', /* 0 => 不强制 1 => 强制 */
    'downloadURL|1': ['http://imgfile.sodive.com/newupload/20171213/1513160885000.apk', 'https://itunes.apple.com/cn/app/sodive-pro/id1239741617?mt=8', 'http://imgfile.sodive.com/newupload/20171204/1512381544671.apk', 'https://itunes.apple.com/cn/app/sodive/id1238554413?mt=8'],
    'createTime': '@datetime'
  }))

  urlList.push(Mock.mock({
    'urlId': '170@integer(10000, 99999)-@string("upper", 4)-@integer(1000000-9999999)',
    'functionIntroduce': '@ctitle(15, 30)',
    'applicationVersion|1': ['user', 'pro'], /* user => 用户端 pro => 教练端 */
    'createTime': '@datetime',
    'urlMap': [
      {'id': '@increment', 'url': 'http://shopcn.sodive.com/Mobile/index.html', 'introduce': '@ctitle', 'language|1': ['en', 'ch'], 'status': '@integer(0, 1)'},
      {'id': '@increment', 'url': 'http://shopen.sodive.com/Mobile/index.html', 'introduce': '@ctitle', 'language|1': ['en', 'ch'], 'status': '@integer(0, 1)'}
    ]
  }))
}

export default {
  getVersionList: config => {
    const { page = 1, limit = 10 } = paramObj(config.url)
    let pageList = versionList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      versionList: pageList,
      total: versionList.length,
      code: 2
    }
  },
  getUrlList: config => {
    const { page = 1, limit = 10 } = paramObj(config.url)
    let pageList = urlList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      urlList: pageList,
      total: urlList.length,
      code: 2
    }
  },
  getUrlInfo: config => {
    const urlId = config.url.match(/(\d+)-([A-Z]+)-(\d+)/)[0]
    const urlInfo = urlList.filter(item => item.urlId === urlId)[0]
    return {
      urlInfo: urlInfo,
      code: 2
    }
  },
  createUrl: config => {
    return {
      info: 'success',
      code: 2
    }
  }
}
