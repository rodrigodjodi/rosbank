<template>
<div class="container">
  <label for="account_name">Nome da conta:</label>
  <input class="u-full-width" type="text" id="account_name" v-model="account.name"/>

  <input-money label="Saldo:" v-model="account.balance"/>

  <label for="accountid">Tipo de conta:</label>
  <select v-model="account.type" name="accounttype" id="accountid">
    
    <option
      v-for="accountType in accountTypes"
      :value="accountType.value"
      :key="accountType.value"
    >
      {{accountType.name}}
    </option>
  </select>
  <label>Cor:</label>
  <compact-picker :palette="defaultColors" v-model="account.color" />
  <br/>
  <div class="row">
    <div class="six columns">
      <button class="u-full-width">LIMPAR</button>
    </div>
    <div class="six columns">
      <button @click="accountCreate" class="button-primary u-full-width">ENVIAR</button>
    </div>
  </div>
</div>
  
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";
import { toID } from "@/assets/utils";
//* Components
import inputMoney from "@/components/inputMoney";
import { Compact } from "vue-color";
export default {
  components: {
    inputMoney,
    "compact-picker": Compact
  },
  name: "AccountForm",
  props: {
    accountEditing: {
      type: Object,
      default: function() {
        return {
          name: "",
          type: "",
          balance: 0,
          color: "#4D4D4D",
          holder: ""
        };
      }
    }
  },
  data() {
    return {
      account: this.accountEditing,
      defaultColors: [
        "#4D4D4D",
        "#999999",
        "#FFFFFF",
        "#F44E3B",
        "#FE9200",
        "#FCDC00"
      ]
    };
  },
  computed: {
    id() {
      return this.user.uid + "-" + toID(this.account.name);
    },
    ...mapState(["user", "accountTypes"])
  },
  methods: {
    accountCreate() {
      this.account.holder = this.user.uid;
      db.collection("contas")
        .doc(this.id)
        .set(this.account)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style>
</style>
