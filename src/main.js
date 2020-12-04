import Vue from 'vue';
import 'ress';
import '@/directives';
import '@/plugins';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import router from './router';
import store from './store';
import App from './App.vue';
import '@/styles/global.scss';
import '@/guard';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
