<template>
<header>
    <div class="container">
      <div class="row">
        <div class="two-thirds column">
          <h1>{{$route.meta.title}}</h1>
        </div>
        <div class="one-third column">
          <button v-if="$store.state.user" @click="doLogout">SAIR</button>
        </div>
      </div>
    </div>
    
    
</header>
</template>

<script>
import { auth } from "@/firebase";
export default {
  methods: {
    doLogout() {
      auth.signOut();
    }
  }
};
</script>

<style scoped>
header {
  padding: 8px;
}
header button {
  float: right;
}
</style>
