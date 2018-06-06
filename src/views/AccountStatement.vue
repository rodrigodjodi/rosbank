<template>
  <div class="container">
    <app-header :title="accountName">
    <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icons.back" size="2x" pull="left"/>
      </router-link>
      <router-link title="Criar nova transação" slot="actions" to="/transaction">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <h5>Extrato</h5>
    <ul>
        <li>Transação</li>
        <li>Transação</li>
        <li>Transação</li>
        <li>Transação</li>
        <li>Transação</li>
    </ul>
    {{$route.params.id}}
  </div>
</template>

<script>
import { mapState } from "vuex";
import appHeader from "@/components/Header";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
export default {
  components: { appHeader, FontAwesomeIcon },
  name: "AccountStatement",
  props: {
    account: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    icons() {
      return {
        plus: faPlus,
        back: faArrowLeft
      };
    },
    accountName() {
      if (this.account) {
        return this.account.name;
      }
    },
    ...mapState(["user", "userAccounts"])
  },
  methods: {}
};
</script>
<style>
</style>
