<template>
  <div class="container">
    <app-header>
      <router-link title="Criar nova conta" slot="actions" to="/account">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <h5>Suas contas</h5>
    <template v-if="userAccounts.length == 0">
      <p>Você não tem nenhuma conta.</p>
      <router-link tag="button" to="/account">CRIAR UMA CONTA</router-link>
    </template>
    <ul v-if="userAccounts">
      <li tabindex="0" class="account" v-for="account in userAccounts" :key="account.id" :style="`border-left-color:${account.color.hex}`">
        <router-link tag="div" class="account-body" :to="{name: 'AccountStatement', params:{account: account} }">
          <p><strong> {{account.name}}</strong></p>
          <p>{{account.balance|currency}}</p>
        </router-link>
        <router-link tag="div" class="action" to="/transaction" :style="`color:${account.color.hex}`">
          <font-awesome-icon :icon="icons.list" size="2x" pull="right" />
        </router-link>
      </li>
    </ul>
     <router-link title="Criar nova conta" slot="actions" to="/account">
      Nova conta
     </router-link>
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
import faListAlt from "@fortawesome/fontawesome-free-solid/faListAlt";
export default {
  components: { appHeader, FontAwesomeIcon },
  name: "accounts",
  data() {
    return {};
  },
  computed: {
    icons() {
      return {
        plus: faPlus,
        list: faListAlt
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
}
</style>
