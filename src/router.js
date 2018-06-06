import Vue from "vue";
import Router from "vue-router";
import { auth } from "./firebase";
// * routes
import AccountList from "./views/AccountList";
import AccountForm from "./views/AccountForm";
import Login from "./views/Login";
import AccountStatement from "./views/AccountStatement";
import TransactionForm from "./views/TransactionForm";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Entrar",
        auth: false
      }
    },
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
      path: "/account",
      name: "AccountNew",
      component: AccountForm,
      meta: {
        title: "Nova conta",
        auth: true
      }
    },
    {
      path: "/account/:id",
      name: "AccountEdit",
      component: AccountForm,
      meta: {
        title: "Dados conta",
        auth: true
      }
    },
    {
      path: "/statement",
      name: "AccountStatement",
      props: true,
      component: AccountStatement,
      meta: {
        title: "Extrato",
        auth: true
      }
    },
    {
      path: "/transaction",
      name: "TransactionNew",
      component: TransactionForm,
      meta: {
        title: "Nova transação",
        auth: true
      }
    },
    {
      path: "/transaction/:id",
      name: "TransactionEdit",
      component: TransactionForm,
      meta: {
        title: "Dados transação",
        auth: true
      }
    }
    //{ path: "*", redirect: "/" }
  ]
});
// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const requiresAuth = to.matched.some(route => route.meta.auth);
  const currentUser = auth.currentUser;
  console.log(requiresAuth, currentUser);
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
