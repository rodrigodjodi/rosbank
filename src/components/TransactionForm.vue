<template>
<div v-if="user">
  <div class="tabs">
    <input type="radio" id="debit" value="debit" v-model="transactionEditing.type">
    <input type="radio" id="credit" value="credit" v-model="transactionEditing.type">
    <input type="radio" id="transfer" value="transfer" v-model="transactionEditing.type">
    <label :class="['tab', transactionEditing.type === 'debit'?'router-link-active':'']" for="debit">Débito</label>
    <label :class="['tab', transactionEditing.type === 'credit'?'router-link-active':'']" for="credit">Crédito</label>
    <label :class="['tab', transactionEditing.type === 'transfer'?'router-link-active':'']" for="transfer">Transferência</label>
  </div>
  <label for="from-account">Conta: <span v-if="accountProp">{{accountProp.name}}</span></label>
  <select v-if="!accountProp" v-model="fromAccount" id="from-account">
    <option value="">Selectione...</option>
    <option v-for="account in userAccounts" :key="account.id" :value="account.id">{{account.name}}</option>
  </select>

  <input-money input-class="u-full-width" label="Valor:" v-model="transactionEditing.value"/>

  <google-place-autocomplete
      v-model="transactionEditing.who"
      id="map"
      classname="u-full-width"
      label="Quem / Onde..."
      :enable-geolocation="true"
      @placechanged="updateLocation"
  />
  <label for="what">O quê?</label>
  <input class="u-full-width" type="text" v-model="transactionEditing.what" id="what" placeholder="Descrição...">

  <label for="when">Quando?</label>
  <input type="date" v-model="transactionEditing.when" id="when">

  <label for="who">Pra quando?</label>
  <input type="date" v-model="transactionEditing.due" id="who">

  <button v-if="transactionEditing.type !== 'transfer'" @click="transactionCreate" class="button-primary u-full-width">LANÇAR</button>
  <button v-if="transactionEditing.type === 'transfer'" @click="makeTransfer" class="button-primary u-full-width">TRANSFERIR</button>

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
    id: {
      type: Object,
      default: function() {
        return {
          type: "debit",
          value: 0,
          who: "",
          what: "",
          when: new Date().toDateInputValue(),
          due: new Date().toDateInputValue(),
          geo: {}
        };
      }
    },
    accountProp: {
      type: Object
    }
  },
  data() {
    return {
      transactionEditing: this.id,
      fromAccount: "",
      toAccount: ""
    };
  },
  computed: {
    icon() {
      return faArrowLeft;
    },
    ...mapState(["user", "userAccounts"])
  },
  methods: {
    transactionCreate() {
      db
        .collection("accounts")
        .doc(this.fromAccount)
        .collection("transactions")
        .add(this.transactionEditing)
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
      this.transactionEditing.geo = {
        lat: payload.latitude,
        lng: payload.longitude
      };
    },
    clearFields() {
      this.transactionEditing = {
        type: "debit",
        value: 0,
        who: "",
        what: "",
        when: new Date().toDateInputValue(),
        due: new Date().toDateInputValue(),
        geo: {}
      };
      this.fromAccount = "";
      this.toAccount = "";
    }
  },
  created() {
    if (this.accountProp) {
      this.fromAccount = this.accountProp.id;
    }
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}
</style>
