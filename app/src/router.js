import Vue from "vue";
import Router from "vue-router";
import AssetChart from "./components/AssetChart.vue";
import Login from "./components/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: AssetChart,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});
