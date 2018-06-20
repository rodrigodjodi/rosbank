import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/firebase";
import router from "@/router";
//* modules
import account from "./modules/account";
import transaction from "./modules/transaction";
import user from "./modules/user";

Vue.use(Vuex);
auth.getRedirectResult().then(
  result => {
    store.commit("SET_LOADING", false);
    if (result.user) {
      store.commit("user/SET_TOKENS", result.credential);
    }
  },
  error => {
    console.error(error.code);
  }
);
auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("user/SET_USER", user);
    //router.replace("/");
    store.dispatch("account/retrieveUserAccounts");
  } else {
    store.commit("user/SET_USER", null);
    store.commit("user/SET_TOKENS", null);
    router.replace("/login");
  }
});
const store = new Vuex.Store({
  modules: { account, transaction, user },
  state: {
    isLoading: true
  },
  mutations: {
    SET_LOADING(state, boolVal) {
      state.isLoading = boolVal;
    }
  },
  actions: {}
});
//* hot module reloading for modules: https://vuex.vuejs.org/guide/hot-reload.html
if (module.hot) {
  module.hot.accept(
    ["./modules/account", "./modules/transaction", "./modules/user"],
    () => {
      const hotAccount = require("./modules/account").default;
      const hotTransaction = require("./modules/transaction").default;
      const hotUser = require("./modules/user").default;
      store.hotUpdate({
        modules: {
          account: hotAccount,
          transaction: hotTransaction,
          user: hotUser
        }
      });
    }
  );
}
export default store;
