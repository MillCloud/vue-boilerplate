import Vue from 'vue';
import '@/plugins';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import '@/styles/preflight.scss';
import '@/styles/global.scss';
import '@/styles/tailwind.scss';
import '@/guard';

const app = new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
});

app.$mount('#app');
