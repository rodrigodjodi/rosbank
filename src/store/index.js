import Vue from "vue";
import Vuex from "vuex";
import { auth, provider, db } from "@/firebase";
import router from "@/router";
//* modules
import account from "./modules/account";
import transaction from "./modules/transaction";
Vue.use(Vuex);
auth.getRedirectResult().then(
  result => {
    console.log(result);
    store.commit("SET_LOADING", false);
    if (result.user) {
      console.log("ainda tem usuário");
      store.commit("SET_TOKENS", result.credential);
    }
  },
  error => {
    console.error(error.code);
  }
);
auth.onAuthStateChanged(user => {
  console.log("auth state changed");
  if (user) {
    store.commit("SET_USER", user);
    //router.replace("/");
    store.dispatch("account/retrieveAccounts");
  } else {
    store.commit("SET_USER", null);
    store.commit("SET_TOKENS", null);
    router.replace("/login");
  }
});
const store = new Vuex.Store({
  modules: { account, transaction },
  state: {
    user: null,
    tokens: null,
    isLoading: true
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_TOKENS(state, payload) {
      state.tokens = payload;
    },
    SET_LOADING(state, boolVal) {
      state.isLoading = boolVal;
    }
  },
  actions: {
    handleSignIn() {
      auth.signInWithRedirect(provider);
    },
    handleSignOut() {
      auth.signOut();
    }
  }
});
//* hot module reloading for modules: https://vuex.vuejs.org/guide/hot-reload.html
if (module.hot) {
  module.hot.accept(["./modules/account", "./modules/transaction"], () => {
    const hotAccount = require("./modules/account").default;
    const hotTransaction = require("./modules/transaction").default;
    store.hotUpdate({
      modules: {
        account: hotAccount,
        transaction: hotTransaction
      }
    });
  });
}
export default store;
