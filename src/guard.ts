import nprogress from 'nprogress';
import router from './router';
// import { getToken } from './utils';
// import store from './store';

router.beforeEach(async (to, from, next) => {
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('\r\n');
  //   console.log('to', to);
  //   console.log('from', from);
  //   console.log('\r\n');
  // }
  // 启动 nprogress
  nprogress.start();

  // const token = getToken();

  // // 放行所有前往首页的路由跳转
  // if (to.path === '/') {
  //   if (token === '') {
  //     next('/sign-in');
  //     return;
  //   }

  //   next();
  //   return;
  // }

  // // 对于前往登录页的路由跳转，只放行没有登录态的情况
  // if (to.path === '/sign-in') {
  //   if (token === '') {
  //     next();
  //     return;
  //   }

  //   next('/');
  //   return;
  // }

  // // 对于需要授权的路由跳转，只放行有登录态且有用户信息的情况
  // if (to.meta?.requiresAuth !== false) {
  //   if (token !== '' && store.state.user.id !== 0) {
  //     next();
  //     return;
  //   }

  //   if (token !== '' && store.state.user.id === 0) {
  //     next({
  //       path: '/',
  //       query: {
  //         redirect: encodeURIComponent(to.fullPath),
  //       },
  //     });
  //     return;
  //   }

  //   if (token === '') {
  //     next({
  //       path: '/sign-in',
  //       query: {
  //         redirect: encodeURIComponent(to.fullPath),
  //       },
  //     });
  //     return;
  //   }

  //   next();
  //   return;
  // }

  next();
});

router.afterEach(() => {
  // 关闭 nprogress
  nprogress.done();
});
