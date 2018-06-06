<template>
  <div class="form-wrapper">

    <div>
      <label for="account_name">Nome da conta:</label>
      <input type="text" id="account_name" v-model="account.name" placeholder="Nome da conta..."/>
    </div>
    <input-money label="Saldo:" v-model="account.balance" />
    <div>
      <label for="accounttype">Tipo de conta:</label>
      <select v-model="account.type" name="accounttype" id="accounttype">
        <option
          v-for="accountType in accountTypes"
          :value="accountType.value"
          :key="accountType.value"
        >
          {{accountType.name}}
        </option>
      </select>
    </div>
    <div>
      <label>Cor:</label>
      <compact-picker :palette="defaultColors" v-model="account.color" />
    </div>
  <button style="margin-top:20px;" @click="accountCreate" class="button-primary u-full-width">ENVIAR</button>
</div>
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";
import { toID } from "@/assets/utils";
//* components
import inputMoney from "@/components/inputMoney";
import { Compact } from "vue-color";
export default {
  name: "newAccount",
  components: { inputMoney, "compact-picker": Compact },
  data() {
    return {
      account: {
        name: "",
        type: "",
        balance: 0,
        color: "#4D4D4D",
        holder: ""
      },
      IsExpanded: false,
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
    ...mapState(["accountTypes", "user"]),
    id() {
      return toID(this.account.name);
    }
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
          this.IsExpanded = false;
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
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
.form-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-end;
}
</style>
