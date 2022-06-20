import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// ***************************************
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* 
   import specific icons 
   원하는 아이콘을 개별적으로 import
*/
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";

/* import font awesome 컴포넌트 */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* 위에서 import한 아이콘들을 Core library에 등록 */
library.add(faHeart, faBars);

/* font awesome 컴포넌트를 전역으로 등록 */
Vue.component("font-awesome-icon", FontAwesomeIcon);
// ***************************************

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  beforeCreate() {
    this.$store.dispatch("getUserInfo");
  },
  render: (h) => h(App),
}).$mount("#app");
