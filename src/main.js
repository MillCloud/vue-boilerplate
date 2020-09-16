import Vue from 'vue';
import i18n from './i18n';
import router from './router';
import store from './store';
import App from './App.vue';
import '@/styles/app.scss';

import '@/directives';
import '@/plugins';

import '@/guard';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
