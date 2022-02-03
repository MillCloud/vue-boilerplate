import Vue from 'vue';
import VueRouter from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

Vue.use(VueRouter);

const routes = setupLayouts(
  generatedRoutes.sort((itemA, itemB) => {
    if (itemA.name === 'all') {
      return 1;
    }
    if (itemB.name === 'all') {
      return -1;
    }
    return 0;
  }),
);

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ x: 0, y: 0, behavior: 'smooth' }),
  routes,
});
