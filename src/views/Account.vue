<template>
  <div class="container">
    <app-header :title="account.name">
    <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icons.back" size="2x" pull="left"/>
      </router-link>
      <router-link title="Criar nova transação" slot="actions" to="/transaction">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <div class="tabs">
      <a @click="view = 'Statement'" :class="['tab', view === 'Statement'?'router-link-active':'']">Extrato</a>
      <a @click="view = 'AccountForm'" :class="['tab', view === 'AccountForm'?'router-link-active':'']">Detalhes</a>
    </div>
    <component :is="view" :account="account"></component>  

  </div>
</template>

<script>
import { mapState } from "vuex";
import appHeader from "@/components/Header";
import Statement from "@/components/Statement";
const AccountForm = () => import("@/components/AccountForm");
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
export default {
  components: { appHeader, FontAwesomeIcon, AccountForm, Statement },
  name: "AccountView",
  props: {},
  data() {
    return {
      account: {},
      view: "Statement"
    };
  },
  computed: {
    ...mapState(["userAccounts"]),
    icons() {
      return {
        plus: faPlus,
        back: faArrowLeft
      };
    }
  },
  watch: {
    userAccounts(val) {
      this.account = val.find(element => {
        return element.id === this.$route.params.id;
      });
    }
  }
};
</script>
<style>
</style>
