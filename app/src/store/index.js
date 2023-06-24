import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userId: "",
  },
  mutations: {
    loginUser(state, user) {
      state.isLogin = true;
      state.userId = user;
    },
    logoutUser(state) {
      state.isLogin = false;
      state.userId = "";
    },
  },
  actions: {
    auth(context, user) {
      context.commit("loginUser", user);
    },
    logout(context) {
      context.commit("logoutUser");
    },
  },
  modules: {},
});

export default store;
