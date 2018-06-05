import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
//import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.filter("currency", function(value) {
  return (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
});
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
