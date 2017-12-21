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
    isCollapse: false,
    isLogin: true
  },
  mutations: {
    openSideBar (state) {
      state.isCollapse = !state.isCollapse
    },
    HIDE_LOGIN (state, login) {
      state.isLogin = login
      window.localStorage.setItem('isLogin', login)
    }
  },
  actions: {
    hideLogin ({ commit }, login) {
      return new Promise(resolve => {
        commit('HIDE_LOGIN', login)
        resolve()
      })
    }
  }
})

export default store
