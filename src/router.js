import Vue from "vue";
import Router from "vue-router";

// * routes
import Contas from "./views/Contas.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "contas",
      component: Contas
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
