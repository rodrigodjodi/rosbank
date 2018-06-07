
<template>
<div>
  <ul v-if="userAccounts">
      <li tabindex="0" class="account" v-for="account in userAccounts" :key="account.id" :style="`border-left-color:${account.color.hex}`">
      <router-link tag="div" class="account-body" :to="`/account/${account.id}`">
          <p><strong> {{account.name}}</strong></p>
          <p>{{account.balance|currency}}</p>
      </router-link>
      <router-link tag="div" class="action" to="/new/transaction" :style="`color:${account.color.hex}`">
          <font-awesome-icon :icon="icons.transaction" size="2x" pull="right" :rotation="90" />
      </router-link>
      </li>
  </ul>
  <router-link 
    title="Criar nova conta"
    slot="actions"
    to="/new/account"
  >Nova conta
  </router-link>
</div>
</template>

<script>
import { mapState } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faSignInAlt from "@fortawesome/fontawesome-free-solid/faSignInAlt";
export default {
  components: { FontAwesomeIcon },
  computed: {
    icons() {
      return {
        transaction: faSignInAlt
      };
    },
    ...mapState(["userAccounts"])
  }
};
</script>

<style>
</style>
