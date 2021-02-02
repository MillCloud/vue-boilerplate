import Vue from 'vue';
import VueRouter from 'vue-router';
import { loadStaticRoutes, loadExceptionRoutes } from './routes';

Vue.use(VueRouter);

/** @desc 创建路由实例的方法 */
const createRouter = () =>
  new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: loadStaticRoutes(),
  });

/** @des 路由实例 */
const router = createRouter();

/** @desc 添加异常路由 */
loadExceptionRoutes().forEach((route) => {
  router.addRoute(route);
});

/**
 * @desc 重置路由实例
 * @link https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export const resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
};

export default router;
