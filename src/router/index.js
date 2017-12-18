import Vue from 'vue'
import Router from 'vue-router'

/* 开发环境不使用懒加载 */
function _import (file) {
  return require('@/components/' + file + '.vue').default
}
// import Index from '@/components/index.vue'

Vue.use(Router)

/**
 * hidden: 是否在左侧导航栏显示,true为隐藏,默认false
 * title: 左侧显示的导航
 * icon: 左侧导航icon-name
 */

export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  {
    path: '/',
    name: 'index',
    component: _import('index'),
    meta: {title: '首页', icon: 'shouye'}
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: _import('userManage/agent/agent'),
    meta: {title: '用户管理', icon: 'people'},
    redirect: '/userManage/agent',
    children: [
      {
        path: 'agent',
        name: 'agent',
        component: _import('userManage/agent/agent'),
        meta: {title: '合伙人'}
      },
      {
        path: 'coach',
        name: 'coach',
        component: _import('userManage/coach/coach'),
        meta: {title: '潜水教练'}
      },
      {
        path: 'user',
        name: 'user',
        component: _import('userManage/user/user'),
        meta: {title: '普通用户'}
      },
      {
        path: 'coachExamine',
        name: 'coachExamine',
        component: _import('userManage/coachExamine/coachExamine'),
        meta: {title: '教练证件审核'}
      },
      {
        path: 'userExamine',
        name: 'userExamine',
        component: _import('userManage/userExamine/userExamine'),
        meta: {title: '用户证件审核'}
      },
      {
        path: 'payAccount',
        name: 'payAccount',
        component: _import('userManage/payAccount/payAccount'),
        meta: {title: '支付账号'}
      }
    ]
  },
  {path: '/order', name: 'order', component: _import('order/index'), meta: {title: '兑换券订单管理', icon: 'dingdan'}},
  {
    path: '/exchange',
    name: 'exchange',
    component: _import('exchange/list/list'),
    meta: {title: '兑换券商城管理', icon: 'duihuanquan'},
    redirect: '/exchange/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: _import('exchange/list/list'),
        meta: {title: '兑换券商品列表'}
      },
      {
        path: 'addItems',
        name: 'addItems',
        component: _import('exchange/addItems/addItems'),
        meta: {title: '新增兑换券商品'}
      }
    ]
  },
  {
    path: '/contentManage',
    component: _import('contentManagement/logger/logger'),
    name: 'contentManage',
    meta: {title: '内容管理', icon: 'neirongguanli'},
    redirect: '/contentManage/logger',
    children: [
      {
        path: 'logger',
        name: 'logger',
        component: _import('contentManagement/logger/logger'),
        meta: {title: '潜水日志'}
      },
      {
        path: 'discoverPending',
        name: 'discoverPending',
        component: _import('contentManagement/discoverPending/discoverPending'),
        meta: {title: '发现审核列表'}
      },
      {
        path: 'discoverPass',
        name: 'discoverPass',
        component: _import('contentManagement/discoverPass/discoverPass'),
        meta: {title: '发现通过列表'}
      },
      {
        path: 'discoverAdd',
        name: 'discoverAdd',
        component: _import('contentManagement/discoverAdd/discoverAdd'),
        meta: {title: '发现新增'}
      }
    ]
  },
  {
    path: '/operationManagement',
    name: 'operationManagement',
    component: _import('operationManagement/taskPending/taskPending'),
    meta: {title: '运营管理', icon: 'yunyingguanli'},
    redirect: 'operationManagement/taskPending',
    children: [
      {
        path: 'taskPending',
        name: 'taskPending',
        component: _import('operationManagement/taskPending/taskPending'),
        meta: {title: '任务审核'}
      },
      {
        path: 'taskManage',
        name: 'taskManage',
        component: _import('operationManagement/taskManage/taskManage'),
        meta: {title: '任务管理'}
      },
      {
        path: 'recommendGoods',
        name: 'recommendGoods',
        component: _import('operationManagement/recommendGoods/recommendGoods'),
        meta: {title: '推荐产品管理'}
      },
      {
        path: 'sodiveCollege',
        name: 'sodiveCollege',
        component: _import('operationManagement/sodiveCollege/sodiveCollege'),
        meta: {title: 'sodive学院'}
      },
      {
        path: 'questionFeedback',
        name: 'questionFeedback',
        component: _import('operationManagement/questionFeedback/questionFeedback'),
        meta: {title: '问题反馈'}
      },
      {
        path: 'shareStatistics',
        name: 'shareStatistics',
        component: _import('operationManagement/shareStatistics/shareStatistics'),
        meta: {title: '分享统计'}
      },
      {
        path: 'adManage',
        name: 'adManage',
        component: _import('operationManagement/adManage/adManage'),
        meta: {title: '广告位管理'}
      },
      {
        path: 'duihuanquan',
        name: 'duihuanquan',
        component: _import('operationManagement/duihuanquan/duihuanquan'),
        meta: {title: '兑换券'}
      }
    ]
  },
  {
    path: '/tools',
    name: 'tools',
    component: _import('tools/massEmail/massEmail'),
    meta: {title: '运营工具', icon: 'tools'},
    redirect: 'tools/massEmail',
    children: [
      {
        path: 'massEmail',
        name: 'massEmail',
        component: _import('tools/massEmail/massEmail'),
        meta: {title: '群发邮件列表'}
      },
      {
        path: 'messageNotification',
        name: 'messageNotification',
        component: _import('tools/messageNotification/messageNotification'),
        meta: {title: '消息通知'}
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: _import('system/urlManage/urlManage'),
    meta: {title: '系统配置', icon: 'xitong'},
    redirect: 'system/urlManage',
    children: [
      {
        path: 'urlManage',
        name: 'urlManage',
        component: _import('system/urlManage/urlManage'),
        meta: {title: '网址管理'}
      },
      {
        path: 'appManage',
        name: 'appManage',
        component: _import('system/appManage/appManage'),
        meta: {title: 'App版本管理'}
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})