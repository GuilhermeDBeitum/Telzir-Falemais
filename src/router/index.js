import Vue from "vue";
import VueRouter from "vue-router";
import Intro from "../components/Intro.vue";
import Simulador from "../components/Simulador.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Intro,
  },
  {
    path: "/simulador",
    name: "Simulador",
    component: Simulador,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
