import Vue from "vue";
import Vuex from "vuex";
import { auth, provider, db } from "./firebase";
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
    //router.replace("/");
    store.dispatch("retrieveAccounts");
  } else {
    store.commit("SET_USER", null);
    store.commit("SET_TOKENS", null);
    router.replace("/login");
  }
});
const store = new Vuex.Store({
  state: {
    user: null,
    userAccounts: null,
    tokens: null,
    isLoading: true,
    transactions: null,
    accountTypes: [
      //TODO: Make this a collection in firestore
      { value: "checking", name: "Conta Corrente" },
      { value: "savings", name: "Poupança" },
      { value: "creditcard", name: "Cartão" },
      { value: "cash", name: "Dinheiro" }
    ]
  },
  mutations: {
    SET_ACCOUNTS(state, payload) {
      console.log("accounts set");
      state.userAccounts = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_TOKENS(state, payload) {
      state.tokens = payload;
    },
    SET_LOADING(state, boolVal) {
      state.isLoading = boolVal;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    }
  },
  actions: {
    handleSignIn() {
      auth.signInWithRedirect(provider);
    },
    handleSignOut() {
      auth.signOut();
    },
    retrieveAccounts({ commit, state }) {
      db.collection("accounts")
        .where("holder", "==", state.user.uid)
        .onSnapshot(querySnapshot => {
          let accounts = {};
          querySnapshot.forEach(doc => {
            accounts[doc.id] = doc.data();
          });
          console.log(accounts);
          commit("SET_ACCOUNTS", accounts);
        });
    },
    retrieveTransactions({ commit, state }, accountId) {
      db.collection("transactions")
        .where("account", "==", accountId)
        .onSnapshot(querySnapshot => {
          let transactions = {};
          querySnapshot.forEach(doc => {
            transactions[doc.id] = doc.data();
          });
          console.log(transactions);
          commit("SET_TRANSACTIONS", transactions);
        });
    }
  }
});
export default store;
