<template>
  <div class="container">
    <app-header>
      <router-link title="Criar nova conta" slot="actions" to="/account">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <div class="tabs">
      <router-link to="/" exact class="tab">Resumo</router-link>
      <router-link to="/statement" exact class="tab ">Lançamentos</router-link>
      <router-link to="/forecast" class="tab ">30 dias</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//libs
import { mapState } from "vuex";
//components
import appHeader from "@/components/Header";
// icons
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

export default {
  components: { appHeader, FontAwesomeIcon },
  name: "accounts",
  data() {
    return {};
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
.account {
  list-style: none;
  border-left: 6px solid;
  padding-left: 8px;
  position: relative;
}

.account:hover,
.account:focus {
  border-left: 10px solid;
  padding-left: 4px;
}
li p {
  margin-bottom: 0.5rem;
}
li p:last-child {
  font-size: 2rem;
  color: #aaa;
}
.account-body {
  width: 80%;
  display: inline-block;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
}
.action {
  float: right;
  width: 48px;
  height: 100%;
  cursor: pointer;
}
</style>
