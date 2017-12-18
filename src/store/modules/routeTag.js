/**
 * Created by zhaojuntong on 2017/12/18.
 */
export default {
  state: {
    visitedTags: []
  },
  mutations: {
    ADD_VISIBLE_TAG (state, tag) {
      if (state.visitedTags.some(v => v.path === tag.path)) return
      state.visitedTags = [
        ...state.visitedTags,
        {
          path: tag.path,
          name: tag.name,
          title: tag.meta.title
        }
      ]
    },
    DEL_VISIBLE_TAG (state, tag) {
      for (const [i, v] of state.visitedTags.entries()) {
        if (v.path === tag.path) {
          state.visitedTags.splice(i, 1)
          break
        }
      }
    },
    DEL_OTHER_TAG (state, tag) {
      for (const [i, v] of state.visitedTags.entries()) {
        if (v.path === tag.path) {
          state.visitedTags = state.visitedTags.slice(i, i + 1)
          break
        }
      }
    },
    DEL_ALL_TAG (state) {
      state.visitedTags = []
    }
  },
  actions: {
    addVisibleTag ({commit}, tag) {
      commit('ADD_VISIBLE_TAG', tag)
    },
    delVisibleTag ({commit, state}, tag) {
      return new Promise(resolve => {
        commit('DEL_VISIBLE_TAG', tag)
        resolve([...state.visitedTags])
      })
    },
    delOtherTag ({commit, state}, tag) {
      return new Promise(resolve => {
        commit('DEL_OTHER_TAG', tag)
        resolve([...state.visitedTags])
      })
    },
    delAllTag ({commit}) {
      return new Promise(resolve => {
        commit('DEL_ALL_TAG')
        resolve()
      })
    }
  }
}
