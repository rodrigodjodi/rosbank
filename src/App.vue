<template>
  <div id="app">
    <app-header/>
    <router-view v-if="user !== null" />
  </div>
</template>
<script>
import appHeader from "@/components/Header";
import { mapState } from "vuex";
import { auth } from "./firebase";
export default {
  components: { appHeader },
  computed: {
    ...mapState(["user"])
  },
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      // initially user = null, after auth it will be either <fb_user> or false
      this.$store.commit("SET_USER", user || false);
      if (user && this.$route.path === "/login") {
        this.$router.replace("/");
      } else if (!user && this.$route.path !== "/login") {
        this.$router.replace("/login");
      }
    });
  }
};
</script>

<style>
</style>
