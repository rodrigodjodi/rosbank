import { auth, provider } from "@/firebase";
import router from "@/router";
auth.getRedirectResult().then(
  result => {
    console.log(result);
    user.commit("SET_LOADING", false);
    if (result.user) {
      console.log("ainda tem usuário");
      user.commit("SET_TOKENS", result.credential);
    }
  },
  error => {
    console.error(error.code);
  }
);
auth.onAuthStateChanged(user => {
  console.log("auth state changed");
  if (user) {
    user.commit("SET_USER", user);
    //router.replace("/");
    user.dispatch("account/retrieveAccounts");
  } else {
    user.commit("SET_USER", null);
    user.commit("SET_TOKENS", null);
    router.replace("/login");
  }
});
const user = {
  namespaced: true,
  state: {
    user: null,
    tokens: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_TOKENS(state, payload) {
      state.tokens = payload;
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
};

export default user;
