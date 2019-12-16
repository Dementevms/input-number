export default {
  namespaced: true,
  state: {
    valueControlA: 0,
    valueControlB: 0
  },
  mutations: {
    setControl(state, data) {
      state[data.id] = data.value;
    }
  },
  actions: {
    setControl({ commit }, data) {
      commit("setControl", data);
    }
  }
};
