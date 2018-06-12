import Vue from "vue";
import Router from "vue-router";
import { auth } from "./firebase";
// * View components
import Login from "./views/Login";
import Home from "./views/Home";
import Account from "./views/Account";
import Forms from "./views/Forms";
//* components
import TransactionForm from "./components/TransactionForm";
import AccountList from "./components/AccountList";
import AccountForm from "./components/AccountForm";
import Statement from "./components/Statement";
import Forecast from "./components/Forecast";

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
      component: Home,
      meta: { title: "Contas", auth: true }
    },
    {
      path: "/account",
      name: "NewAccount",
      component: Forms,
      props: { comp: "AccountForm" },
      meta: { title: "Dados conta", auth: true }
    },
    {
      path: "/account/:accountId",
      name: "AccountProperties",
      component: Account,
      props: true,
      meta: { title: "Dados conta", auth: true }
    },
    {
      path: "/account/:accountId/transaction",
      name: "NewTransaction",
      component: Forms,
      props: { comp: "TransactionForm" },
      meta: { title: "Novo lançamento", auth: true }
    },
    {
      path: "/account/:accountId/transaction/:transactionId",
      name: "TransactionProperties",
      component: Forms,
      props: { comp: "TransactionForm" },
      meta: { title: "Transação", auth: true }
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
