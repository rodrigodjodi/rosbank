<template>
<div v-if="userAccounts">
  <div class="tabs">
    <input class="hide" type="radio" id="debit" value="debit" v-model="transaction.type">
    <input class="hide" type="radio" id="credit" value="credit" v-model="transaction.type">
    <input class="hide" type="radio" id="transfer" value="transfer" v-model="transaction.type">
    <label :class="['tab', transaction.type === 'debit'?'router-link-active':'']" for="debit">Débito</label>
    <label :class="['tab', transaction.type === 'credit'?'router-link-active':'']" for="credit">Crédito</label>
    <label :class="['tab', transaction.type === 'transfer'?'router-link-active':'']" for="transfer">Transferência</label>
  </div>
  <label for="from-account">Conta: <span v-if="accountId">{{userAccounts[accountId].name}}</span></label>
  <select v-if="!accountId" v-model="fromAccount" id="from-account">
    <option value="">Selecione...</option>
    <option v-for="(account, id) in userAccounts" :key="id" :value="id">{{account.name}}</option>
  </select>

  <input-money input-class="u-full-width" label="Valor:*" v-model="transaction.amount"/>

  <google-place-autocomplete
      v-model="transaction.who"
      id="map"
      classname="u-full-width"
      label="Quem / Onde?*"
      :enable-geolocation="true"
      @placechanged="updateLocation"
  />
  <label for="what">O quê?</label>
  <input class="u-full-width" type="text" v-model="transaction.what" id="what" placeholder="Descrição...">

  <label for="when">Quando?<small> Use uma data futura para fazer agendamentos únicos.</small></label>
  <input type="date" v-model="date" id="date" name="date">
  

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
import { firebase } from "@firebase/app";
//*components
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
        what: "",
        when: null,
        due: null,
        geo: null,
        who: ""
      },
      fromAccount: "",
      toAccount: "",
      date: new Date().toDateInputValue()
    };
  },
  computed: {
    ...mapState({
      userAccounts: state => state.account.userAccounts,
      user: state => state.user.user.uid,
      transactions: state => state.transaction.transactions
    }),
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
      let resultingBalance = this.accountBalance;
      let today = new Date().toDateInputValue();
      // if date is greater than today, its a schedule
      if (today.localeCompare(this.date) < 0) {
        this.transaction.due = this.date;
      } else {
        // it´s paid, set both date fields
        this.transaction.due = this.date;
        this.transaction.when = this.date;
        //aaand adjust the balance
        if (this.transaction.type === "debit") {
          resultingBalance = this.accountBalance - this.transaction.amount;
        } else if (this.transaction.type === "credit") {
          resultingBalance = this.accountBalance + this.transaction.amount;
        }
      }
      this.transaction.createdOn = new Date();
      this.transaction.user = this.user;
      this.transaction.account = this.accountId;
      let payload = {
        balance: resultingBalance,
        transaction: this.transaction
      };
      this.$store
        .dispatch("transaction/createTransaction", payload)
        .then(() => {
          this.clearFields();
          this.$router.go(-1);
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
      this.transaction.geo = new firebase.firestore.GeoPoint(
        payload.latitude,
        payload.longitude
      );
    },
    clearFields() {
      this.transaction = {
        type: "debit",
        amount: 0,
        what: "",
        when: null,
        due: null,
        geo: null,
        who: ""
      };
      this.fromAccount = "";
      this.toAccount = "";
      this.date = new Date().toDateInputValue();
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

<style>
input[type="radio"].hide {
  display: none;
}
small {
  font-weight: 200;
}
</style>
