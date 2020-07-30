import axios from "axios";

export default {
  state: {
    event: [],
    events: [],
  },
  actions: {
    async createEvent({ commit }, payload) {
      try {
        const { data } = await axios.post("/api/events/", payload);
        console.log("Data запроса", data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getEvents({ commit }, params) {
      try {
        const { data } = await axios.get(`/api/events/`, {params: params});
        console.log("Data запроса", data);
        commit("updateEvents", data.results);
        return data.count
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getEventById({ commit }, eventId) {
      try {
        const { data } = await axios.get(`/api/events/${eventId}/`);
        console.log("get запрос", data);
        commit("updateEvent", data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateEvent({ commit }, payload) {
      try {
        const { data } = await axios.patch(`/api/events/${payload.id}/`, payload);
        console.log("patch запрос", data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async deleteEvent({ commit }, eventId) {
      try {
        const { data } = await axios.delete(`/api/events/${eventId}/`);
        console.log("delete запрос", data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  mutations:{
    updateEvents(state, events){
      state.events = events
    },
    updateEvent(state, event){
      state.event = event
    }
  },
  getters: {
    allEvents(state) {
      return state.events;
    },
    eventInfo(state){
      return state.event
    }
  },
};
