import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDataState: null
  },
  mutations: {
    setUserData(state, userData) {
      state.userDataState = userData;
    },
    clearUserData(state) {
      state.userDataState = null;
    }
  },
  actions: {
  },
  getters: {
    isAuthenticated: state => state.userDataState !== null,
    getUserData: state => state.userDataState
  },
  modules: {
  }
})
