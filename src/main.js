import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import { auth } from "./firebase";
import VeeValidate from "vee-validate";
//import "./registerServiceWorker";
//*css
import "@/assets/normalize.css";
import "@/assets/skeleton.css";
Vue.config.productionTip = false;
Vue.filter("currency", function(value) {
  return (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
});
Vue.use(VeeValidate);
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
