import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/style.css";
import api from "./services/api";

Vue.prototype.$http = api;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
