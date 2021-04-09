import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { auth } from "./auth.module";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:4000/api/v1",
    loading: false,
    rent: [],
    offices: []
  },
  getters: {
    GET_RENT(state) {
      return state.rent;
    },
    GET_OFFICES(state) {
      return state.offices;
    }
  },
  mutations: {
    SET_LOADING_STATUS(state) {
      state.loading = !state.loading;
    },
    SET_RENT(state, payload) {
      state.rent = payload;
    },
    SET_OFFICES(state, payload) {
      state.offices = payload;
    }
  },
  actions: {
    fetchRent(context) {
      const options = { headers: { "Content-Type": "application/json" } };
      const date = JSON.parse(sessionStorage.getItem("date"));
      context.commit("SET_LOADING_STATUS");
      axios
        .get(
          this.state.API_URL +
            "/rents?start=" +
            date.start +
            "&end=" +
            date.end +
            "&office=" +
            date.office,
          options
        )
        .then(response => {
          context.commit("SET_LOADING_STATUS");
          context.commit("SET_RENT", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchCar(context, id) {
      const options = { headers: { "Content-Type": "application/json" } };
      context.commit("SET_LOADING_STATUS");
      axios
        .get(this.state.API_URL + "/car/" + id, options)
        .then(response => {
          context.commit("SET_LOADING_STATUS");
          context.commit("SET_RENT", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async fetchSuggest(context, search) {
      const options = { headers: { "Content-Type": "application/json" } };
      context.commit("SET_LOADING_STATUS");
      await axios
        .get(this.state.API_URL + "/office?search=" + search, options)
        .then(response => {
          context.commit("SET_LOADING_STATUS");
          context.commit("SET_OFFICES", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  modules: {
    auth
  }
});
