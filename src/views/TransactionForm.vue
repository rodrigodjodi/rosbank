<template>
<div class="container">
  <app-header>
      <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icon" size="2x" pull="left"/>
      </router-link>
  </app-header>
  <h1>form here</h1>
</div>
</template>

<script>
import { mapState } from "vuex";
import appHeader from "@/components/Header";
import inputMoney from "@/components/inputMoney";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
export default {
  components: {
    inputMoney,
    appHeader,
    FontAwesomeIcon
  },
  name: "TransactionForm",
  computed: {
    icon() {
      return faArrowLeft;
    },
    id() {
      return toID(this.account.name);
    },
    ...mapState(["user", "accountTypes"])
  }
};
</script>

<style>
</style>
