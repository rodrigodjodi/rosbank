<template>
<div>
  <div class="tabs">
    <a class="tab">Débito</a>
    <a class="tab ">Crédito</a>
    <a class="tab ">Transferência</a>
  </div>
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
    ...mapState(["user", "accountTypes"])
  }
};
</script>

<style>
</style>
