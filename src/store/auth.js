import axios from "axios";

const jwtDecode = require("jwt-decode");

export default {
  state: {
    // username: localStorage.getItem("username") || "",
    // userId: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
    // status: "",
  },
  actions: {
    async register({ commit }, payload) {
      try {
        const resp = await axios.post("/auth/users/", payload);
        console.log("Внутрненний", resp);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async createToken({ commit }, payload) {
      // commit('AUTH_REQUEST')
      try {
        const { data } = await axios.post("/auth/jwt/create/", payload);
        const response = jwtDecode(data.access);
        console.log("Внутренний", response);

        if (data.access) {
          localStorage.setItem("token", data.access);
          localStorage.setItem("username", payload.username);
          localStorage.setItem("userId", response.user_id);
          commit('updateToken', data.access)
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.access;
        }
      } catch (e) {
        commit("setError", e);
        // commit('AUTH_ERROR', e)
        localStorage.removeItem("token");
        throw e;
      }
    },
    async logout() {
      // commit("AUTH_LOGOUT");
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      delete axios.defaults.headers.common['Authorization']
    },
  },
  mutations: {
    updateToken(state, token){
      state.token = token
    },
    // AUTH_SUCCESS(state, token, username, userId){
    //   state.status = 'success'
    //   state.token = token
    //   state.username = username
    //   state.userId = userId
    // },
    // AUTH_ERROR(state){
    //   state.status = 'error'
    // },
    // AUTH_LOGOUT(state) {
    //   state.status = 'logout'
    //   state.token = ''
    //   state.username = '';
    //   state.userId = '';
    // },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    // authStatus: (state) => state.status,
    // GET_USERNAME(state) {
    //   return state.username;
    // },
    // GET_USER_ID(state) {
    //   return state.userId;
    // },
  },
};
