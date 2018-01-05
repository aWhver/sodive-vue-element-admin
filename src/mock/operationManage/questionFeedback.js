/**
 * Created by zhaojuntong on 2018/1/5.
 */
import Mock from 'mockjs'
import { paramObj } from 'utils/index'

let questionList = []
const count = 18

for (let i = 0; i < count; i++) {
  questionList.push(Mock.mock({
    'id': '@increment',
    'question': {
      'content': '@ctitle',
      'images|1-2': ['http://img.sodive.com/newupload/20171231/1514713843497.jpg', 'http://img.sodive.com/newupload/20171220/1513736922599.jpg']
    },
    'userId': '@character("AC123456789")@integer(10000,99999)',
    'email': '@email',
    'nickName': '@first',
    'createTime': '@datetime',
    'answerTime': '@datetime',
    'status': '@integer(0, 1)',
    'answerContent': '@ctitle'
  }))
}

export default {
  getQuestionList: config => {
    const { page = 1, limit = 10, sortId } = paramObj(config.url)
    if (sortId === '-id') questionList = questionList.reverse()
    const pageList = questionList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: questionList.length,
      questionList: pageList,
      code: 2
    }
  }
}
