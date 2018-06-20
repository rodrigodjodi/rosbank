import { db } from "@/firebase";
const transaction = {
  namespaced: true,
  state: {
    transactions: {}
  },
  mutations: {
    /**
     *
     * @param {*} state
     * @param {object} payload
     */
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    }
  },
  actions: {
    /**
     * Get transactions from account.
     * @param {*} { commit }
     * @param {string} accountId
     */
    retrieveTransactions({ commit }, accountId) {
      db.collection("transactions")
        .where("account", "==", accountId)
        .onSnapshot(querySnapshot => {
          let transactions = {};
          querySnapshot.forEach(doc => {
            transactions[doc.id] = doc.data();
          });
          commit("SET_TRANSACTIONS", transactions);
        });
    }
  }
};

export default transaction;
