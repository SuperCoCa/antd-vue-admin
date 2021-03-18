import { getInfo } from '@/api/setting/admin'

const state = {
  userInfo: {}
}

const mutations = {
  SET_INFO: function (state, payload) {
    state.userInfo = payload
  }
}

const actions = {
  GetInfo: function ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (response.data) {
          commit('SET_INFO', response.data)
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}