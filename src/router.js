import Vue from "vue";
import Router from "vue-router";
import { auth } from "./firebase";
// * routes
import AccountList from "./views/AccountList.vue";
import AccountForm from "./views/AccountForm.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
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
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const requiresAuth = to.matched.some(route => route.meta.auth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
