import Vue from "vue";
import Router from "vue-router";
import { auth } from "./firebase";
import store from "./store";
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
  console.log("1.router before resolve");
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  auth.getRedirectResult().then(result => {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
      console.log("1.5 Token: " + token);
    }
    console.log("antes result user");
    if (result.user) {
      store.commit("SET_USER", result.user);
      if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
    } else {
      store.commit("SET_USER", null);
      if (to.meta.auth) {
        next("login");
      } else {
        next();
      }
    }
  });
});
export default router;
