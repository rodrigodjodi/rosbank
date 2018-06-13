import { db } from "@/firebase";
const transaction = {
  namespaced: true,
  state: {
    transactions: {}
  },
  mutations: {
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    }
  },
  actions: {
    retrieveTransactions({ commit }, accountId) {
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
};

export default transaction;
