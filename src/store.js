import Vue from "vue";
import Vuex from "vuex";
import { auth, provider } from "./firebase";
import router from "./router";
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
    router.replace("/");
  } else {
    store.commit("SET_USER", null);
    store.commit("SET_TOKENS", null);
    router.replace("/login");
  }
});
export const store = new Vuex.Store({
  state: {
    user: null,
    contas: null,
    tokens: null,
    isLoading: true,
    accountTypes: [
      { value: "checking", name: "Conta Corrente" },
      { value: "savings", name: "Poupança" },
      { value: "creditcard", name: "Cartão" },
      { value: "cash", name: "Dinheiro" }
    ]
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
      auth.signOut(); /* .then(() => {
        commit("SET_USER", null);
        commit("SET_TOKENS", null);
      });*/
    }
  }
});
