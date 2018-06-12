<template>
<div class="container">
  <app-header>
      <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icon" size="2x" pull="left"/>
      </router-link>
  </app-header>
 <component :is="comp"></component> 
</div>
  
</template>

<script>
//* Components
import appHeader from "@/components/Header";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
const AccountForm = () => import("@/components/AccountForm");
const TransactionForm = () => import("@/components/TransactionForm");

export default {
  name: "Forms",
  components: {
    appHeader,
    FontAwesomeIcon,
    AccountForm,
    TransactionForm
  },
  props: {
    comp: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return faArrowLeft;
    }
  }
};
</script>

<style>
</style>
