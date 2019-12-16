/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import controls from "./modules/controls";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    controls
  }
});
