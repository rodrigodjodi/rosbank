<template>
  <div class="container">
    <app-header>
      <router-link title="Criar nova conta" slot="actions" to="new/account">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <div class="tabs">
      <a @click="view = 'AccountList'" :class="['tab', view === 'AccountList'?'router-link-active':'']">Resumo</a>
      <a @click="view = 'Forecast'" :class="['tab', view === 'Forecast'?'router-link-active':'']">30 dias</a>
    </div>
    <component :is="view"></component>
  </div>
</template>

<script>
//libs
import { mapState } from "vuex";
//*components
import appHeader from "@/components/Header";
import AccountList from "@/components/AccountList";
const Statement = () => import("@/components/Statement");
const Forecast = () => import("@/components/Forecast");
// icons
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

export default {
  components: { appHeader, FontAwesomeIcon, AccountList, Statement, Forecast },
  name: "accounts",
  data() {
    return {
      view: "AccountList"
    };
  },
  computed: {
    icons() {
      return {
        plus: faPlus
      };
    },
    ...mapState(["user", "userAccounts"])
  },
  methods: {}
};
</script>
<style>
</style>
