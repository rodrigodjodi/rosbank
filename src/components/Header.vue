<template>

<header>
  <div class="header-menu">
    <slot name="nav">
      <img @click="doLogout" v-if="user" :src="user.photoURL" alt="O botão  de menu é a foto de perfil do usuário.">
    </slot>
  </div>
  <span class="header-title">{{computedTitle}}</span>
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
  props: {
    title: {
      type: String
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    computedTitle() {
      return this.title ? this.title : this.$route.meta.title;
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch("user/handleSignOut");
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
