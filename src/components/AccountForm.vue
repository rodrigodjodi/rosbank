<template>
<div>
  <label for="account_name">Nome da conta:</label>
  <input v-validate="'length:3,16'" :class="{'u-full-width':true, 'is-error': errors.has('account_name')}" type="text" id="account_name" name="account_name" v-model="account.name" :disabled="readOnly"/>

  <input-money input-class="u-full-width" label="Saldo:" v-model="account.balance" :disabled="readOnly"/>

  <label for="accounttype">Tipo de conta:</label>
  <select v-model="account.type" name="accounttype" id="accounttype" :disabled="readOnly">
    
    <option
      v-for="accountType in accountTypes"
      :value="accountType.value"
      :key="accountType.value"
    >
      {{accountType.name}}
    </option>
  </select>
  <label>Cor:</label>
  <compact-picker :palette="defaultColors" v-model="account.color" :disabled="readOnly"/>
  <br/>
  <div v-if="accountId && !readOnly" class="row">
     <label for="account_share">Compartilhada com:</label>
    <ul>
      <li v-for="(value, key) in account.sharedWith" :key="key" v-if="value">{{key}}
        <button @click="accountUnShare(key)">X</button>
      </li>
    </ul>
      <a href="" @click.prevent="sharing = !sharing" v-if="!sharing">Compartilhar</a>
      <input 
        :class="{'is-error': errors.has('account_share')}"
        type="email"
        id="account_share"
        name="account_share"
        v-if="sharing"
        placeholder="Email para compartilhar..."
        @blur="sharing=false"
        @keyup.enter="accountShare()"
        v-model="sharingMail"
      />
  </div>
  <div v-if="!accountId" class="row">
    <div class="six columns">
      <button @click="clearFields" class="u-full-width">LIMPAR</button>
    </div>
    <div class="six columns">
      <button @click="accountCreate" class="button-primary u-full-width">ENVIAR</button>
    </div>
  </div>
  <div v-else class="row">
    <div class="one-third column">
      <button @click="accountDelete" class="button-danger u-full-width" :disabled="readOnly">EXCLUIR</button>
    </div>
    <div class="two-thirds column">
      <button @click="accountUpdate" class="button-primary u-full-width" :disabled="readOnly">ATUALIZAR</button>
    </div>
  </div>  
</div>  
</template>

<script>
import { mapState } from "vuex";
import { toID } from "@/assets/utils";
//* Components
import inputMoney from "@/components/inputMoney";
import { Compact } from "vue-color";
export default {
  name: "AccountForm",
  components: {
    inputMoney,
    "compact-picker": Compact
  },
  props: {
    accountId: {
      type: String
    }
  },
  data() {
    return {
      account: {
        name: "",
        type: "",
        balance: 0,
        color: "#4D4D4D",
        holder: "",
        sharedWith: {}
      },
      defaultColors: [
        "#4D4D4D",
        "#999999",
        "#FFFFFF",
        "#EC0000",
        "#FE9200",
        "#FFED00",
        "#84139E",
        "#3E8C3B",
        "#0E56BD"
      ],
      sharing: false,
      sharingMail: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      accountTypes: state => state.account.accountTypes,
      userAccounts: state => state.account.userAccounts
    }),
    idFromName() {
      return this.accountId ? this.accountId : toID(this.account.name);
    },
    readOnly() {
      if (!this.accountId) return false;
      return this.account.holder !== this.user.uid;
    }
  },
  methods: {
    accountCreate() {
      //TODO: validation goes here
      this.account.holder = this.user.uid;
      this.account.createdOn = new Date();
      this.$store
        .dispatch("account/create", this.account) // src/store/modules/account.js
        .then(() => {
          this.clearFields();
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
          //TODO: nice error treatment, please
        });
    },
    accountUpdate() {
      console.log(this.account);
      //TODO: validate and call updtate function
    },
    accountDelete() {
      let sure = window.confirm(
        "ATENÇÃO: Essa ação apagará a conta. As transações continuarão existindo"
      );
      if (sure) {
        this.$store
          .dispatch("account/delete", this.accountId) // src/store/modules/account.js
          .then(() => {
            console.log("conta apagada");
            this.$router.push("/");
          })
          .catch(error => {
            console.error(error);
            //TODO: nice error treatment, please
          });
      }
    },
    accountShare() {
      //TODO> validate email
      let payload = {
        email: this.sharingMail,
        id: this.accountId,
        value: true
      };
      this.$store
        .dispatch("account/share", payload)
        .then(() => {
          this.sharing = false;
        })
        .catch(error => console.error(error));
    },
    accountUnShare(email) {
      let payload = {
        email: email,
        id: this.accountId,
        value: false
      };
      this.$store
        .dispatch("account/share", payload)
        .then(() => {
          this.sharing = false;
        })
        .catch(error => console.error(error));
    },
    clearFields() {
      this.account = {
        name: "",
        type: "",
        balance: 0,
        color: "#4D4D4D",
        holder: "",
        sharedWith: {}
      };
    }
  },
  created() {
    if (this.accountId) {
      this.account = {};
      this.account = { ...this.userAccounts[this.accountId] };
    }
  },
  watch: {
    userAccounts() {
      if (this.accountId) {
        this.account = {};
        this.account = { ...this.userAccounts[this.accountId] };
      }
    }
  }
};
</script>

<style>
</style>