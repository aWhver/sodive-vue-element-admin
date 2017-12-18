/**
 * Created by zhaojuntong on 2017/12/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { constantRouterMap } from '../router/index'
import routeTag from './modules/routeTag'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    routeTag
  },
  state: {
    constantRouterMap: constantRouterMap,
    isCollapse: false
  },
  mutations: {
    openSideBar (state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export default store
