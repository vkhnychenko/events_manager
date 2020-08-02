import axios from "axios";

export default {
  state: {
    event: [],
    events: [],
    totalItems: 0
  },
  actions: {
    async createEvent({ commit }, payload) {
      try {
        await axios.post("/api/events/", payload );
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getEvents({ commit }, params) {
      try {
        const { data } = await axios.get(`/api/events/`, {params: params});
        commit("updateEvents", data.results);
        commit("updateTotalItems", data.count);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async getEventById({ commit }, eventId) {
      try {
        const { data } = await axios.get(`/api/events/${eventId}/`);
        commit("updateEvent", data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateEvent({ commit }, payload) {
      try {
        await axios.patch(`/api/events/${payload.id}/`, payload);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async deleteEvent({ commit }, eventId) {
      try {
        await axios.delete(`/api/events/${eventId}/`);
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
    },
    updateTotalItems(state, totalItems){
      state.totalItems = totalItems
    },
  },
  getters: {
    allEvents(state) {
      return state.events;
    },
    eventInfo(state){
      return state.event
    },
    totalItems(state){
      return state.totalItems
    }
  },
};
