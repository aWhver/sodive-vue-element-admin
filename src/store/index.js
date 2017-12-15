/**
 * Created by lenovo on 2017/12/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { constantRouterMap } from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
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
