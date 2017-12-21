/**
 * Created by zhaojuntong on 2017/12/20.
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken } from 'utils/auth' // 验权
function _import (file) {
  return require('@/components/' + file + '.vue').default
}
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      store.dispatch('hideLogin', false).then(() => {
        next({path: '/'})
        console.log(3)
      })
    } else {
      if (localStorage.getItem('isLogin')) {
        store.dispatch('hideLogin', false).then(() => {
          store.dispatch('GenerateRoutes').then(() => {
            // router.addRoutes([{path: '/order', name: 'order-demo', component: _import('order/index'), meta: {title: '兑换券订单管理', icon: 'dingdan'}}])
            // next({ ...to, replace: true })
          })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
