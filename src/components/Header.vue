<template>

<header>
  <div class="header-menu">
    <slot name="nav">
      <img @click="doLogout" v-if="user" :src="user.photoURL" alt="O botão  de menu é a foto de perfil do usuário.">
    </slot>
  </div>
  <span class="header-title">{{$route.meta.title}}</span>
  <div  class="header-tools">
    <slot name="actions">
      
    </slot>
  </div>
</header>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appHeader",
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
  flex-basis: 25%;
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
  flex: 1 0 50%;
  text-align: center;
}
.header-tools {
  flex-basis: 25%;
  overflow: visible;
  padding: 8px 0;
}
.header-tools svg {
  color: #33c3f0;
}
</style>
