import Vue from 'vue'
import Vuex from 'vuex'
import { BehaviorSubject } from 'rxjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new BehaviorSubject(),
    conferences: new BehaviorSubject([]),
    messages: new BehaviorSubject([]),
    notifications: new BehaviorSubject([]),
    currentConf: new BehaviorSubject(null),
    socket: new BehaviorSubject(null)
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
    },
    setCurrentConf (state, payload) {
      state.currentConf.next(payload)
    },
    setDefaultCurrentConf (state) {
      state.currentConf.next(null)
    },
    setSocket (state, payload) {
      state.socket.next(payload)
    },
    setDefaultSocket (state) {
      state.socket.next(null)
    },
    addMessagesObj (state, payload) {
      state.messages.getValue().push({ confId: payload, messages: [] })
    },
    addMessages (state, payload) {
      const messageObjs = state.messages.getValue()

      const targetMesObj = messageObjs.find(messageObj => messageObj.confId === payload.confId)

      if (Array.isArray(payload.messages)) {
        targetMesObj.messages.unshift(...payload.messages)
      } else {
        targetMesObj.messages.unshift(payload.messages)
      }
    },
    setNotifications (state, payload) {
      state.notifications.next(payload)
    },
    addNotification (state, payload) {
      state.notifications.getValue().unshift(payload)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getMessages: state => confId => {
      const res = state.messages.getValue().find(obj => obj.confId === confId)

      if (res) {
        return res.messages
      }

      return null
    },
    getNotifications: state => {
      return state.notifications
    }
  }
})
