<template>
  <div id="app">
    <app-header/>
    <router-view/>
    {{error}}
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
  }
  //TODO: onAuthStateChanged in some hook basically to treat logOut
};
</script>

<style>
</style>
