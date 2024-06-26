import Vue from "vue";
import vueRouter from "vue-router";
import home from "../views/home.vue";
import about from "../views/about.vue";
import search from "../views/search.vue";
import petDetails from "../cmps/pet-details.vue";
import userDetails from "../views/user.details.vue";

Vue.use(vueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/search",
    name: "search",
    component: search,
  },
  {
    path: "/user/:userId",
    name: "user-details",
    component: userDetails,
  },
  {
    path: "/pet/:petId",
    name: "pet-details",
    component: petDetails,
  },
];

const router = new vueRouter({
  routes,
});

export default router;
