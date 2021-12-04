import nprogress from 'nprogress';
import router from './router';

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach(() => {
  nprogress.done();
});
