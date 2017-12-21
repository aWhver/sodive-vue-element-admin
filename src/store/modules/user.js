/**
 * Created by zhaojuntong on 2017/12/19.
 */
import { login } from 'api/login'
import { getToken, setToken, removeToken } from 'utils/auth'
export default {
  state: {
    username: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_ROLES (state, roles) {
      state.roles = roles
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_AVATAR (state, avatar) {
      state.avatar = avatar
    },
    SET_INTRODUCTION (state, introduction) {
      state.introduction = introduction
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.data) {
            const data = response.data
            commit('SET_TOKEN', data.token)
            setToken(new Date().getTime(), 'Expires-Token') // for testing whether token is invalid
            setToken(data.token)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeToken('Expires-Token')
        localStorage.removeItem('isLogin')
        resolve()
      })
    }
  }
}
