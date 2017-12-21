/**
 * Created by zhaojuntong on 2017/12/20.
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken } from 'utils/auth' // 验权

let registerRouterFresh = true
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
          store.dispatch('GetUserInfo').then((data) => {
            const { roles } = data
            store.dispatch('GenerateRoutes', roles).then(() => {
              if (registerRouterFresh) {
                router.addRoutes(store.getters.addRouters)
                registerRouterFresh = false
              }
              next()
            })
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
