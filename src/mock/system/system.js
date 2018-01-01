/**
 * Created by zhaojuntong on 2018/1/1.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let versionList = []
const count = 10

for (let i = 0; i < count; i++) {
  versionList.push(Mock.mock({
    'id': '@increment',
    'systemType': '@integer(0, 1)', /* 0 => 教练版 1 => 用户版 */
    'systemName': ['sodive', 'sodibePRO'],
    'applicationType': '@integer(0, 1)', /* 0 => Android 1 => IOS */
    'version': '@integer(1, 2).@integer(0, 1).@integer(0, 9)',
    'forceUpdate': '@integer(0, 1)', /* 0 => 不强制 1 => 强制 */
    'downloadURL|1': ['http://imgfile.sodive.com/newupload/20171213/1513160885000.apk', 'https://itunes.apple.com/cn/app/sodive-pro/id1239741617?mt=8', 'http://imgfile.sodive.com/newupload/20171204/1512381544671.apk', 'https://itunes.apple.com/cn/app/sodive/id1238554413?mt=8'],
    'createTime': '@datetime'
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
  }
}
