/**
 * Created by zhaojuntong on 2017/12/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { constantRouterMap } from '../router/index'
import getters from './getters'
import routeTag from './modules/routeTag'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    routeTag,
    user
  },
  getters,
  state: {
    constantRouterMap: constantRouterMap,
    isCollapse: false,
    isLogin: true
  },
  mutations: {
    openSideBar (state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export default store
