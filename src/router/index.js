import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";
import Favorites from "@/views/Favorites.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/movie/:id",
      name: "details",
      component: Details,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
    },
  ],
});

export default router;
