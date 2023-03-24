import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userId: "",
  },
  mutations: {
    updateUser(state, user) {
      state.isLogin = true;
      state.userId = user;
    },
  },
  actions: {
    auth(context, user) {
      context.commit("updateUser", user);
    },
  },
  modules: {},
});

export default store;
