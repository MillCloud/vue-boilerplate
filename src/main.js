import Vue from 'vue';
import '@/plugins';
import i18n from './i18n';
import router from './router';
import store from './store';
import App from './App.vue';
import '@/styles/global.scss';
import '@/guard';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
