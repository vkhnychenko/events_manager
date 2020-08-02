import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import event from './event'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
  },
  modules: {
    auth,event
  },
  getters: {
    error(state) {
      return state.error;
    },
  }
})
