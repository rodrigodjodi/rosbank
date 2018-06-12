<template>
<div v-if="userAccounts">
  <div class="tabs">
    <input type="radio" id="debit" value="debit" v-model="transaction.type">
    <input type="radio" id="credit" value="credit" v-model="transaction.type">
    <input type="radio" id="transfer" value="transfer" v-model="transaction.type">
    <label :class="['tab', transaction.type === 'debit'?'router-link-active':'']" for="debit">Débito</label>
    <label :class="['tab', transaction.type === 'credit'?'router-link-active':'']" for="credit">Crédito</label>
    <label :class="['tab', transaction.type === 'transfer'?'router-link-active':'']" for="transfer">Transferência</label>
  </div>
  <label for="from-account">Conta: <span v-if="accountId">{{userAccounts[accountId].name}}</span></label>
  <select v-if="!accountId" v-model="fromAccount" id="from-account">
    <option value="">Selecione...</option>
    <option v-for="(account, id) in userAccounts" :key="id" :value="id">{{account.name}}</option>
  </select>

  <input-money input-class="u-full-width" label="Valor:" v-model="transaction.amount"/>

  <google-place-autocomplete
      v-model="transaction.who"
      id="map"
      classname="u-full-width"
      label="Quem / Onde..."
      :enable-geolocation="true"
      @placechanged="updateLocation"
  />
  <label for="what">O quê?</label>
  <input class="u-full-width" type="text" v-model="transaction.what" id="what" placeholder="Descrição...">

  <label for="when">Quando?</label>
  <input type="date" v-model="transaction.when" id="when">

  <label for="who">Pra quando?</label>
  <input type="date" v-model="transaction.due" id="who">

  <button v-if="transaction.type !== 'transfer'" @click="transactionCreate" class="button-primary u-full-width">LANÇAR</button>
  <button v-if="transaction.type === 'transfer'" @click="makeTransfer" class="button-primary u-full-width">TRANSFERIR</button>

</div>
</template>

<script>
Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
//* libs
import { mapState } from "vuex";
import { db } from "@/firebase";
//*components
import appHeader from "@/components/Header";
import inputMoney from "@/components/inputMoney";
import GooglePlaceAutocomplete from "@/components/GooglePlaceAutocomplete";
//*icons
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
export default {
  name: "TansactionForm",
  components: {
    inputMoney,
    GooglePlaceAutocomplete,
    appHeader,
    FontAwesomeIcon
  },
  props: {
    transactionId: {
      type: String
    }
  },
  data() {
    return {
      transaction: {
        type: "debit",
        amount: 0,
        who: "",
        what: "",
        when: new Date().toDateInputValue(),
        due: new Date().toDateInputValue(),
        geo: null
      },
      fromAccount: "",
      toAccount: ""
    };
  },
  computed: {
    ...mapState(["user", "userAccounts", "transactions"]),
    icon() {
      return faArrowLeft;
    },
    accountId() {
      return this.$route.params.accountId;
    },
    accountBalance() {
      return this.userAccounts[this.accountId].balance;
    }
  },
  methods: {
    transactionCreate() {
      let resultingBalance;
      if (this.transaction.type === "debit") {
        resultingBalance = this.accountBalance - this.transaction.amount;
      } else if (this.transaction.type === "credit") {
        resultingBalance = this.accountBalance + this.transaction.amount;
      }
      this.transaction.user = this.user.uid;
      this.transaction.account = this.accountId;
      db
        .collection("transactions")
        .add(this.transaction)
        .then(() => {
          this.clearFields();
          return db
            .collection("accounts")
            .doc(this.accountId)
            .update({ balance: resultingBalance })
            .then(() => this.$router.go(-1));
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    makeTransfer() {
      //TODO: Make 2 consecutive transactionCreate and evaluate success of both
      console.log("this is a transfer");
    },
    updateLocation(payload) {
      this.transaction.geo = {
        lat: payload.latitude,
        lng: payload.longitude
      };
    },
    clearFields() {
      this.transaction = {
        type: "debit",
        amount: 0,
        who: "",
        what: "",
        when: new Date().toDateInputValue(),
        due: new Date().toDateInputValue(),
        geo: null
      };
      this.fromAccount = "";
      this.toAccount = "";
    }
  },
  created() {
    if (this.accountId) {
      this.fromAccount = this.accountId;
    }
    if (this.transactionId) {
      this.transaction = {};
      this.transaction = { ...this.transactions[this.transactionId] };
    }
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}
</style>
