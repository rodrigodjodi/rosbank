import { auth, provider } from "@/firebase";

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
