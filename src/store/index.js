/**
 * Created by zhaojuntong on 2017/12/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import routeTag from './modules/routeTag'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    routeTag,
    user,
    permission
  },
  getters,
  state: {
    isCollapse: false
  },
  mutations: {
    openSideBar (state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export default store
