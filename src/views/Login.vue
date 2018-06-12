<template>
  <div class="container">
    <app-header />
    <div class="row">
      <button class="button-primary" @click="doLogin">ENTRAR COM O GOOGLE</button>
    </div>
  </div>
</template>

<script>
import appHeader from "@/components/Header";
import { mapState } from "vuex";
export default {
  components: { appHeader },
  data() {
    return {
      error: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    doLogin() {
      this.$store.dispatch("handleSignIn");
    }
  },
  mounted() {
    if (this.user) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.row {
  text-align: center;
  margin-top: 20%;
}
</style>
