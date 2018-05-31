<template>
<div class="container">
  <header>
    <div class="header-menu">
      <img v-if="user" :src="user.photoURL" alt="O botão  de menu é a foto de perfil do usuário.">
    </div>
    <span class="header-title">{{$route.meta.title}}</span>
    <slot class="header-tools">
      <button v-if="user" @click="doLogout">SAIR</button>
    </slot>
  </header>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    doLogout() {
      this.$store.dispatch("handleSignOut");
    }
  }
};
</script>

<style scoped>
header {
  padding: 8px;
  display: flex;
  justify-content: center;
}
.header-menu {
  flex-basis: 48px;
  flex-shrink: 0;
  flex-grow: 0;
}
.header-menu img {
  width: 40px;
  border-radius: 50%;
}
header span.header-title {
  font-size: 3rem;
  line-height: 1.35;
  letter-spacing: -0.08rem;
  flex: 1 0;
  text-align: center;
}
.header-tools {
  flex-basis: 96px;
}
</style>
