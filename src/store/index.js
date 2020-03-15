import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      personalId: null,
      password: null,
      nickname: null,
      age: null,
      status: null,
      lastVisit: null,
      apiKey: null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setDefaultUser (state) {
      state.user = {
        id: null,
        personalId: null,
        password: null,
        nickname: null,
        age: null,
        status: null,
        lastVisit: null,
        apiKey: null
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
