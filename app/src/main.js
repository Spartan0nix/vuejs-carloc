import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store/index";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSuggestion from "vue-suggestion";
import VeeValidate from "vee-validate";
import AsyncComputed from "vue-async-computed";

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueSuggestion);
Vue.use(VeeValidate);
Vue.use(AsyncComputed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
