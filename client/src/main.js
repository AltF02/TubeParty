import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import VueYoutube from 'vue-youtube'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(Notifications)
Vue.use(SuiVue)
Vue.use(VueYoutube)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
