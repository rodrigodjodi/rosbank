import { db } from "@/firebase";
const account = {
  namespaced: true,
  state: {
    userAccounts: null,
    accountTypes: [
      //?: Make this a collection in firestore?
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
    }
  },
  actions: {
    retrieveAccounts({ commit, rootState }) {
      db.collection("accounts")
        .where("holder", "==", rootState.user.user.uid)
        .onSnapshot(querySnapshot => {
          let accounts = {};
          querySnapshot.forEach(doc => {
            accounts[doc.id] = doc.data();
          });
          console.log(accounts);
          commit("SET_ACCOUNTS", accounts);
        });
    },
    create({}, accountObj) {
      console.log("dispatch in account called");
      db.collection("accounts").add(accountObj);
    },
    delete({}, accountId) {
      db.collection("accounts")
        .doc(accountId)
        .delete();
    }
  }
};

export default account;
