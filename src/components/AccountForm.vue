<template>
<div>
  <label for="account_name">Nome da conta:</label>
  <input class="u-full-width" type="text" id="account_name" v-model="accountEditing.name"/>

  <input-money input-class="u-full-width" label="Saldo:" v-model="accountEditing.balance"/>

  <label for="accounttype">Tipo de conta:</label>
  <select v-model="accountEditing.type" name="accounttype" id="accounttype">
    
    <option
      v-for="accountType in accountTypes"
      :value="accountType.value"
      :key="accountType.value"
    >
      {{accountType.name}}
    </option>
  </select>
  <label>Cor:</label>
  <compact-picker :palette="defaultColors" v-model="accountEditing.color" />
  <br/>
  <div v-if="!accountEditing.id" class="row">
    <div class="six columns">
      <button @click="clearFields" class="u-full-width">LIMPAR</button>
    </div>
    <div class="six columns">
      <button @click="accountCreate" class="button-primary u-full-width">ENVIAR</button>
    </div>
  </div>
  <div v-else class="row">
    <div class="one-third column">
      <button @click="accountDelete" class="button-danger u-full-width">EXCLUIR</button>
    </div>
    <div class="two-thirds column">
      <button @click="accountUpdate" class="button-primary u-full-width">ATUALIZAR</button>
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
  name: "AccountForm",
  components: {
    inputMoney,
    "compact-picker": Compact
  },
  props: {
    account: {
      type: Object,
      default: function() {
        return {
          name: "",
          type: "",
          balance: 0,
          color: "#4D4D4D",
          holder: "",
          id: null
        };
      }
    }
  },
  data() {
    return {
      accountEditing: this.account,
      defaultColors: [
        "#4D4D4D",
        "#999999",
        "#FFFFFF",
        "#ec0000",
        "#FE9200",
        "#ffed00",
        "#84139e",
        "#3E8C3B",
        "#0e56bd"
      ]
    };
  },
  computed: {
    id() {
      return toID(this.account.name);
    },
    ...mapState(["user", "accountTypes"])
  },
  methods: {
    accountCreate() {
      this.account.holder = this.user.uid;
      db
        .collection("contas")
        .doc(this.id)
        .set(this.account)
        .then(() => {
          this.clearFields();
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    accountUpdate() {
      console.log(this.accountEditing);
      //TODO: deve atualizar a conta e todos seus lançamentos
    },
    accountDelete() {
      let sure = window.confirm(
        "ATENÇÃO: Essa ação apagará a conta. As transações continuarão existindo"
      );
      if (sure) {
        db
          .collection("contas")
          .doc(this.accountEditing.id)
          .delete()
          .then(() => {
            console.log("conta apagada");
            this.$router.push("/");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    clearFields() {
      this.account = {
        name: "",
        type: "",
        balance: 0,
        color: "#4D4D4D",
        holder: ""
      };
    }
  }
};
</script>

<style>
</style>
