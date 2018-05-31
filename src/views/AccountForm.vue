<template>
<div class="container">
  <label for="account_name">Nome da conta</label>
  <input class="u-full-width" type="text" id="account_name" v-model="account.name"/>

  <input-money label="Saldo:" v-model="account.balance"/>

<select v-model="account.type" name="accounttype">
  <option disabled value="">Tipo...</option>
  <option
    v-for="accountType in accountTypes"
    :value="accountType.value"
    :key="accountType.value"
  >
    {{accountType.name}}
  </option>
</select>

  <compact-picker v-model="account.color" />

  <div class="row">
    <div class="six columns">
      <button class="u-full-width">LIMPAR</button>
    </div>
    <div class="six columns">
      <button class="button-primary u-full-width">ENVIAR</button>
    </div>
  </div>
</div>
  
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";
import { toID } from "@/assets/utils";
//* Components
import inputMoney from "@/components/inputMoney"
import {Compact} from 'vue-color'
export default {
  components: {
    inputMoney,
    'compact-picker': Compact,
  },
  name:"AccountForm",
  props: {
    accountEditing:{
      type: Object,
      default: function(){
        return {
          name: '',
          type: '',
          balance: 0,
          color: ''
        }
      }
    }
  },
  data () {
    return {
      account: this.accountEditing
    }
  },
  computed: {
    id () {
      return toID(this.account.name)
    },
    ...mapState(["user", "accountTypes"])
  }
  }
</script>

<style>
</style>
