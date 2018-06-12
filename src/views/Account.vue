<template>
  <div v-if="userAccounts" class="container">
    <app-header :title="account ? account.name : 'Erro'">
      <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icons.back" size="2x" pull="left"/>
      </router-link>
      <router-link v-if="account" title="Criar nova transação" slot="actions" :to="{name:'NewTransaction', params:{accountProp:accountId}}">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <h5 v-if="!account">A conta "{{accountId}}" não existe</h5>
    <div class="tabs" v-if="account">
      <a @click="view = 'Statement'" :class="['tab', view === 'Statement'?'router-link-active':'']">Extrato</a>
      <a @click="view = 'AccountForm'" :class="['tab', view === 'AccountForm'?'router-link-active':'']">Detalhes</a>
    </div>
    <keep-alive>
      <component :is="view" :accountId="accountId" transition="fade" transition-mode="out-in"></component>  
    </keep-alive>
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
  props: {
    accountId: {
      type: String
    }
  },
  data() {
    return {
      view: "Statement"
    };
  },
  computed: {
    ...mapState(["userAccounts"]),
    account() {
      return this.userAccounts[this.accountId];
    },
    icons() {
      return {
        plus: faPlus,
        back: faArrowLeft
      };
    }
  }
};
</script>
<style>
.fade-transition {
  transition: opacity 0.82s ease;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>
