import Vue from "vue";
import Router from "vue-router";
//import { auth } from "./firebase";
//import store from "./store";
// * routes
import Contas from "./views/Contas.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "contas",
      component: Contas,
      meta: {
        title: "Contas",
        auth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Entrar",
        auth: false
      }
    }
  ]
});
// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
  /*if (to.meta.auth) {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.commit("SET_USER", user);
        next();
      } else {
        next("/login");
      }
    });
  } else {
    next();
  }*/
});
export default router;
