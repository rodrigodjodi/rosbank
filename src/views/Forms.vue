<template>
<div class="container">
  <app-header>
      <router-link slot="nav" to="/">
        <font-awesome-icon :icon="icon" size="2x" pull="left"/>
      </router-link>
  </app-header>
 <router-view></router-view>
</div>
  
</template>

<script>
//* Components
import appHeader from "@/components/Header";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";
export default {
  components: {
    appHeader,
    FontAwesomeIcon
  },
  name: "Forms",

  computed: {
    icon() {
      return faArrowLeft;
    }
  }
};
</script>

<style>
</style>
