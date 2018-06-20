<template>
<div>
  <h6 v-if="!Object.keys(transactions).length">Ainda não há transações</h6>
  <ul v-else>
    <li tabindex="0" class="transaction" v-for="(transaction, id) in transactions" :key="id">
    <router-link tag="div" class="transaction-body" :to="`/account/${accountId}/transaction/${id}`">
      <p><strong> {{transaction.who}}</strong></p>
      <p>{{transaction.amount|currency}}</p>
      <p>{{transaction.what}}</p>
    </router-link>
    </li>
  </ul>
</div>    
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "accountStatement",
  props: {
    accountId: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      transactions: state => state.transaction.transactions
    })
  },
  methods: {},
  created() {
    if (this.accountId) {
      this.$store.dispatch("transaction/retrieveTransactions", this.accountId);
    }
  },
  destroyed() {
    this.$store.commit("transaction/SET_TRANSACTIONS", {});
  }
};
</script>

<style>
.transaction {
  list-style: none;
  border-left: 1px solid black;
  padding-left: 8px;
  position: relative;
}
</style>
