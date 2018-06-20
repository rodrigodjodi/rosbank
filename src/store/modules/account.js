import { db } from "@/firebase";
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
      const test = db.FieldPath("test", "rodrigo.djodi@gmail.com");
      console.log(test);
      let query = db.collection("accounts").where(test, "==", true);
      console.log(query);
      /*.onSnapshot(querySnapshot => {
          let accounts = {};
          querySnapshot.forEach(doc => {
            accounts[doc.id] = doc.data();
          });
          commit("MERGE_SHARED_ACCOUNTS", accounts);
        });*/
    },
    create({}, accountObj) {
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
