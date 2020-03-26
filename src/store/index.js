import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    userDetails: localStorage.getItem('userDetails') || null,
    userName: localStorage.getItem('userName') || null,
    now: localStorage.getItem('now') || false
  },
  mutations: {
    login (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userDetails', data.userDetails)
      localStorage.setItem('now', true)
      state.userDetails = data.userDetails
      state.token = data.token
      state.now = true
    },
    updateName (state, name) {
      localStorage.setItem('userName', name)
      // eslint-disable-next-line no-undef
      state.userName = userName
    },
    logout (state) {
      // 移除token
      localStorage.removeItem('token')
      localStorage.removeItem('userDetails')
      localStorage.removeItem('userName')
      state.userDetails = null
      state.userName = null
      state.token = null
      state.now = false
    }
  },
  actions: {
  }
})
