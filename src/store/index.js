import Vue from 'vue'
import Vuex from 'vuex'
import { BehaviorSubject } from 'rxjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new BehaviorSubject(),
    conferences: new BehaviorSubject([])
  },
  mutations: {
    setUser (state, payload) {
      state.user.next(payload)
    },
    setDefaultUser (state) {
      state.user.next(null)
      state.conferences.next([])
    },
    setConferences (state, payload) {
      state.conferences.next(payload)
    },
    addConferences (state, payload) {
      state.conferences.getValue().unshift(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
