<template>
  <div class="container">
    <app-header>
      <router-link title="Criar nova conta" slot="actions" to="/novaconta">
        <font-awesome-icon :icon="icons.plus" size="2x" pull="right"/>
      </router-link>
    </app-header>
    <h5>Suas contas</h5>
    <template v-if="userAccounts.length == 0">
      <p>Você não tem nenhuma conta.</p>
      <router-link tag="button" to="/novaconta">CRIAR UMA CONTA</router-link>
    </template>
    <ul>
      <li class="account" v-for="(props, account) in userAccounts" :key="account" :style="`border-left-color:${props.color.hex}`">
        <router-link  class="account-body" :to="`extrato/${props.id}`">
          <p><strong> {{props.name}}</strong></p>
          <p>{{props.balance|currency}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import appHeader from "@/components/Header";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
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
li p {
  margin-bottom: 0.5rem;
}
li p:last-child {
  font-size: 2rem;
  color: #666;
}
.account-body {
  display: inline-block;
}
.action {
  float: right;
  width: 48px;
  height: 100%;
}
.action svg {
  color: #666;
}
</style>
