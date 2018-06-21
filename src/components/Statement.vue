<template>
<div>
  <h6 v-if="!Object.keys(transactions).length">Ainda não há transações</h6>
  <ul v-else>
    <li tabindex="0"
      class="transaction"
      v-for="(transaction, id) in transactions" :key="id"
    >
      <span class="transaction-date">{{(transaction.when || transaction.due)|iso2local}}</span>
      <router-link
        tag="div"
        class="transaction-body"
        :to="`/account/${accountId}/transaction/${id}`"
      >
        <span class="transaction-who"> {{transaction.who}}</span>
        <span class="transaction-what">{{transaction.what}}</span>
      </router-link>
      <span :class="{'transaction-amount':true, negative:transaction.type === 'debit' }">{{transaction.amount|currency}}</span>
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
  filters: {
    iso2local(val) {
      return new Date(val).toLocaleString("pt-br", {
        month: "numeric",
        day: "numeric"
      });
    }
  },
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
  display: flex;
}
.transaction-date {
  flex: 0 0 50px;
  align-self: center;
}
.transaction-body {
  user-select: none;
  cursor: pointer;
  flex: 1 1 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.transaction-amount {
  flex: 0 0 80px;
  color: #1eaedb;
  align-self: center;
  text-align: right;
}
.transaction-who {
  font-weight: 600;
  line-height: 1.2;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.transaction-what {
  line-height: 1.2;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #aaa;
}
</style>
