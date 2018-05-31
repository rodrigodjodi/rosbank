import Vue from "vue";
import Router from "vue-router";
import store from "./store";
// * routes
import AccountList from "./views/AccountList.vue";
import AccountForm from "./views/AccountForm.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "AccountList",
      component: AccountList,
      meta: {
        title: "Contas",
        auth: true
      }
    },
    {
      path: "/novaconta",
      name: "AccountForm",
      component: AccountForm,
      meta: {
        title: "Nova conta",
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
  if (to.meta.auth) {
    //?Do we have a user in the store?
    store.state.user ? next() : next("/login");
  } else {
    next();
  }
});
export default router;
