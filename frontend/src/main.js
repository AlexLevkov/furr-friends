import Vue from "vue";
import app from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/style.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "apiKey",
    libraries: "places",
  },
});

new Vue({
  router,
  store,
  render: (h) => h(app),
}).$mount("#app");
