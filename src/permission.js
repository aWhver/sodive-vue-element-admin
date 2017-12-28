/**
 * Created by zhaojuntong on 2017/12/20.
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from 'utils/auth' // 验权

function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then((data) => {
          const { roles } = data
          store.dispatch('GenerateRoutes', roles).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({...to, replace: true})
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
