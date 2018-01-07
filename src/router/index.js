import Vue from 'vue'
import Router from 'vue-router'

/* 开发环境不使用懒加载 */
function _import (file) {
  return require('@/components/' + file + '.vue').default
}
// import Index from '@/components/sidebarItem.vue'

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
    path: '',
    component: _import('layout/layout'),
    redirect: '/index',
    children: [{path: 'index', name: 'index', component: _import('index'), meta: {title: '首页', icon: 'shouye'}}]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/userManage',
    name: 'userManage',
    component: _import('layout/layout'),
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
        meta: {title: '潜水教练', keepalive: true}
      },
      {
        path: 'user',
        name: 'user',
        component: _import('userManage/user/user'),
        meta: {title: '普通用户', keepalive: true}
      },
      {
        path: 'coachExamine',
        name: 'coachExamine',
        component: _import('userManage/coachExamine/coachExamine'),
        meta: {title: '教练证件审核', keepalive: true}
      },
      {
        path: 'userExamine',
        name: 'userExamine',
        component: _import('userManage/userExamine/userExamine'),
        meta: {title: '用户证件审核', keepalive: true}
      },
      {
        path: 'payAccount',
        name: 'payAccount',
        component: _import('userManage/payAccount/payAccount'),
        meta: {title: '支付账号', keepalive: true}
      }
    ]
  },
  {
    path: '/order',
    component: _import('layout/layout'),
    children: [{
      path: 'index',
      name: 'order',
      component: _import('order/index'),
      meta: {title: '兑换券订单管理', icon: 'dingdan'}
    }]
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: _import('layout/layout'),
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
      },
      {
        path: ':id',
        component: _import('exchange/addItems/addItems'),
        meta: {title: '编辑兑换券商品'},
        hidden: true
      }
    ]
  },
  {
    path: '/contentManage',
    component: _import('layout/layout'),
    name: 'contentManage',
    meta: {title: '内容管理', icon: 'neirongguanli'},
    redirect: '/contentManage/logger',
    children: [
      /* {
        path: 'logger',
        name: 'logger',
        component: _import('contentManagement/logger/logger'),
        meta: {title: '潜水日志'}
      }, */
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
    component: _import('layout/layout'),
    meta: {title: '运营管理', icon: 'yunyingguanli'},
    redirect: 'operationManagement/taskPending',
    children: [
      {
        path: '/operationManagement/taskManage',
        name: 'taskManageIndex',
        component: _import('operationManagement/taskManage/index'),
        meta: {title: '任务管理', icon: 'task'},
        redirect: '/operationManagement/taskManage/taskPending',
        children: [
          {path: 'taskPending', name: 'taskPending', component: _import('operationManagement/taskManage/children/taskPending'), meta: {title: '任务审核'}},
          {path: 'taskManage', name: 'taskManage', component: _import('operationManagement/taskManage/children/taskManage'), meta: {title: '任务管理'}},
          {path: 'userNumberRecord/:taskId', component: _import('operationManagement/taskManage/children/userNumberRecord'), hidden: true},
          {path: 'editTask', name: 'editTask', component: _import('operationManagement/taskManage/children/editTask'), hidden: true, meta: {title: '新增主任务'}},
          {path: 'editTask/:taskId', component: _import('operationManagement/taskManage/children/editTask'), hidden: true, meta: {title: '编辑主任务'}}
        ]
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
      {path: 'sodiveCollege/sodive/:id', component: _import('operationManagement/sodiveCollege/editSodive'), hidden: true, meta: {title: '编辑sodive学院'}},
      {
        path: 'questionFeedback',
        name: 'questionFeedback',
        component: _import('operationManagement/questionFeedback/questionFeedback'),
        meta: {title: '问题反馈', keepalive: true}
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
        meta: {title: '广告位管理', keepalive: true}
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
    component: _import('layout/layout'),
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
        path: 'emailTemplate',
        name: 'emailTemplate',
        component: _import('tools/massEmail/components/emailTemplate'),
        meta: {title: '新建邮件模板'}
      },
      {
        path: 'editTemplate/:emailId',
        component: _import('tools/massEmail/components/emailTemplate'),
        hidden: true,
        meta: {title: '编辑邮件模板'}
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
    component: _import('layout/layout'),
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
        path: 'url/:urlId',
        component: _import('system/urlManage/components/urlInfo'),
        hidden: true,
        meta: {title: '网址信息'}
      },
      {
        path: 'appManage',
        name: 'appManage',
        component: _import('system/appManage/appManage'),
        meta: {title: 'App版本管理'}
      }
    ]
  },
  {path: '*', component: _import('errorPage/404'), hidden: true}
]
