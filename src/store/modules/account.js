import { db } from "@/firebase";
import { firebase } from "@firebase/app";
const account = {
  namespaced: true,
  state: {
    userAccounts: {},
    accountTypes: [
      //?: Make this a collection in firestore?
      { value: "checking", name: "Conta Corrente" },
      { value: "savings", name: "Poupança" },
      { value: "creditcard", name: "Cartão" },
      { value: "cash", name: "Dinheiro" }
    ]
  },
  mutations: {
    SET_USER_ACCOUNTS(state, payload) {
      state.userAccounts = payload;
    },
    MERGE_SHARED_ACCOUNTS(state, payload) {
      state.userAccounts = { ...state.userAccounts, ...payload };
    }
  },
  actions: {
    retrieveUserAccounts({ commit, rootState }) {
      db.collection("accounts")
        .where("holder", "==", rootState.user.user.uid)
        .onSnapshot(querySnapshot => {
          let accounts = {};
          querySnapshot.forEach(doc => {
            accounts[doc.id] = doc.data();
          });
          commit("SET_USER_ACCOUNTS", accounts);
        });
    },
    retrieveSharedAccounts({ commit, rootState }) {
      const test = new firebase.firestore.FieldPath(
        "sharedWith",
        rootState.user.user.email
      );
      console.log(test);
      db.collection("accounts")
        .where(test, "==", true)
        .onSnapshot(querySnapshot => {
          let accounts = {};
          querySnapshot.forEach(doc => {
            accounts[doc.id] = doc.data();
          });
          commit("MERGE_SHARED_ACCOUNTS", accounts);
        });
    },
    create({}, accountObj) {
      db.collection("accounts").add(accountObj);
    },
    delete({}, accountId) {
      db.collection("accounts")
        .doc(accountId)
        .delete();
    },
    share({}, accountObj) {
      console.log(accountObj);
      db.collection("accounts")
        .doc(accountObj.id)
        .update({ sharedWith: accountObj.sharedWith });
    }
  }
};

export default account;
