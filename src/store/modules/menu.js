const state = {
  curMenu: '',
  curTab: '',
}

const mutations = {
  SET_CUR_MENU: function (state, payload) {
    state.curMenu = payload.name
  },
  SET_CUR_TAB: function (state, payload) {
    state.curTab = payload
  }
}

const actions = {
  SetCurMenu: function ({ commit }, payload) {
    commit('SET_CUR_MENU', payload)
  },
  SetCurTab: function ({ commit }, payload) {
    commit('SET_CUR_TAB', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}