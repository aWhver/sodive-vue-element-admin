/**
 * Created by zhaojuntong on 2017/12/19.
 */
import { constantRouterMap, asyncRouterMap } from 'router'

/**
 * 判断当前用户权限是否匹配
 * @param roles
 * @param route
 */
/* function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
} */

/**
 * 异步过滤权限路由
 * @param asyncRouterMap
 * @param roles
 */
/* function filterAsyncRouterMap (asyncRouterMap, roles) {
  const accessedRoutes = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children )
    }
  })
} */

export default {
  state: {
    routes: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS (state, routes) {
      state.routes = constantRouterMap.concat(routes)
      state.addRouters = routes
    }
  },
  actions: {
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}
