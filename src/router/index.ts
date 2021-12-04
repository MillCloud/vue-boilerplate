import Vue from 'vue';
import VueRouter from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

Vue.use(VueRouter);

const routes = setupLayouts(generatedRoutes);
export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ x: 0, y: 0, behavior: 'smooth' }),
  routes,
});
