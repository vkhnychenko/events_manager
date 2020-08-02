import axios from "axios";

const jwtDecode = require("jwt-decode");

export default {
  state: {
    token: localStorage.getItem("token") || "",
  },
  actions: {
    async register({ commit }, payload) {
      try {
        await axios.post("/auth/users/", payload);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async createToken({ commit }, payload) {
      try {
        const { data } = await axios.post("/auth/jwt/create/", payload);
        const response = jwtDecode(data.access);
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
        localStorage.removeItem("token");
        throw e;
      }
    },
    async logout() {
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
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
};
