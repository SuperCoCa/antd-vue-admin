import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import user from './modules/user'
import menu from './modules/menu'

import getters from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    user,
    menu,
  },
  getters,
})

export default store