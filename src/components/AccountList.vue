
<template>
<div>
  
  <ul v-if="userAccounts">
      <li
        tabindex="0"
        class="account"
        v-for="(account, id) in userAccounts" :key="id"
        :style="`border-left-color:${account.color.hex}`"
      >
      <router-link tag="div" class="account-body" :to="`/account/${id}`">
          <p>
            <strong> {{account.name}}</strong>
            <span class="pill" v-if="account.sharedWith[userEmail]">compartilhada</span>
          </p>
          <p :class="{negative:account.balance < 0}">{{account.balance|currency}}</p>
      </router-link>
      <router-link tag="div" class="action" :to="{name:'NewTransaction', params:{accountId:id}}" :style="`color:${account.color.hex}`">
          <font-awesome-icon :icon="icons.transaction" size="2x" pull="right" :rotation="90" />
      </router-link>
      </li>
  </ul>
  
 
  <router-link 
    title="Criar nova conta"
    slot="actions"
    to="/account"
  >Nova conta
  </router-link>
</div>
</template>

<script>
import { mapState } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faSignInAlt from "@fortawesome/fontawesome-free-solid/faSignInAlt";
export default {
  name: "AccountList",
  components: { FontAwesomeIcon },
  computed: {
    icons() {
      return {
        transaction: faSignInAlt
      };
    },
    ...mapState({
      userAccounts: state => state.account.userAccounts,
      userEmail: state => state.user.user.email
    })
  },
  created() {
    this.$store
      .dispatch("account/retrieveSharedAccounts")
      .then(() => {
        console.log(this.$store.state.account.userAccounts);
      })
      .catch(error => {
        console.error(error);
      });
  },
  destroyed() {
    console.log("accountList destroyed");
  }
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
  opacity: 0.8;
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
