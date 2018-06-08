<template>
  <div id="app">
    <router-view/>
    <div v-if="isLoading" id="spinner"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
//import { auth } from "./firebase";
export default {
  data() {
    return {
      error: ""
    };
  },
  computed: {
    ...mapState(["user", "isLoading"])
  },
  beforeCreate() {}
};
</script>

<style>
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.tab {
  font-size: 2rem;
  line-height: 1.5;
  letter-spacing: -0.05rem;
  font-weight: 300;
  flex: 1;
  text-decoration: none;
  color: #ccc;
  text-align: center;
  cursor: pointer;
}
.tab.router-link-active {
  font-weight: 500;
  border-bottom: 4px solid #1eaedb;
  color: white;
}
#spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 100px;
  height: 100px;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
