<template>
  <div class="container">
    <div class="row">
      <button class="button-primary" @click="doLogin">ENTRAR COM O GOOGLE</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: ""
    };
  },
  methods: {
    doLogin() {
      this.$store.dispatch("handleSignIn");
    }
  },
  created() {
    this.$store.dispatch("handleRedirect");
  }
};
</script>

<style scoped>
.row {
  text-align: center;
  margin-top: 20%;
}
</style>
