import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/style.css";
import store from "./store";
import api from "./services/api";

Vue.prototype.$http = api;

new Vue({
  mode: "history",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
