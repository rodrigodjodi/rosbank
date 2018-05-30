import Vue from "vue";
import Vuex from "vuex";
import { auth, provider } from "./firebase";
import router from "./router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    contas: null,
    tokens: null,
    isLoading: false
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
    handleRedirect({ commit }) {
      commit("SET_LOADING", true);
      auth.getRedirectResult().then(
        result => {
          console.log(result);
          commit("SET_LOADING", false);
          if (result.user) {
            console.log("ainda tem usuário");
            commit("SET_TOKENS", result.credential);
          }
        },
        error => {
          console.error(error.code);
        }
      );
    },
    handleSignOut() {
      auth.signOut(); /* .then(() => {
        commit("SET_USER", null);
        commit("SET_TOKENS", null);
      });*/
    },
    observeUser({ commit }) {
      console.log("store observeUser action");
      auth.onAuthStateChanged(user => {
        console.log("auth state changed");
        if (user) {
          commit("SET_USER", user);
          router.replace("/");
        } else {
          commit("SET_USER", null);
          commit("SET_TOKENS", null);
          router.push("/login");
        }
      });
    }
  }
});
