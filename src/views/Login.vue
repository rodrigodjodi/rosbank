<template>
  <div class="container">
    <div class="row">
      <button class="button-primary" @click="doLogin">ENTRAR COM O GOOGLE</button>
    </div>
    <div class="row">
      Erro: {{error}}
    </div>
  </div>
</template>

<script>
import { auth, provider } from "../firebase";
export default {
  data() {
    return {
      error: ""
    };
  },
  methods: {
    doLogin() {
      auth.signInWithRedirect(provider);
    }
  }
  /* created() {
    auth
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          //this.token = result.credential.accessToken;
          this.$router.replace("/");
        }
        //this.user = result.user;
      })
      .catch(function(error) {
        this.error = error.code;
      });
  } */
};
</script>

<style scoped>
row {
  text-align: center;
}
</style>
