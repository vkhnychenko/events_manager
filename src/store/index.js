import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import event from './event'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    searchValue:''
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
    setSearchValue(state, value){
      state.searchValue = value
    }
  },
  actions: {
    getSearchValue({commit}, value){
      commit('setSearchValue', value)
    }
  },
  modules: {
    auth,event
  },
  getters: {
    error(state) {
      return state.error;
    },
    searchValue(state){
      return state.searchValue
    }
  }
})
