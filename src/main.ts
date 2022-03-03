import Vue from 'vue';
import '@/plugins';
import { createPinia } from 'pinia';
import browserUpdate from 'browser-update';
import Components from './components';
import router from './router';
import App from './App.vue';
import '@/styles/preflight.scss';
import '@/styles/global.scss';
import '@/guard';

browserUpdate({
  required: { e: 79, f: 67, o: 50, s: 12, c: 63 },
  insecure: true,
  unsupported: true,
});

Vue.use(Components);

const app = new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
});

app.$mount('#app');
