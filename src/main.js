import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SuiVue from 'semantic-ui-vue';
import VueYoutube from 'vue-youtube';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);
Vue.use(VueYoutube);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
