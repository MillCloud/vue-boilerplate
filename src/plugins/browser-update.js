import VueBrowserUpdate from '@sum.cumo/vue-browserupdate';
import Vue from 'vue';

// https://caniuse.com/?search=proxy
// https://caniuse.com/?search=flexbox
// https://caniuse.com/?search=css%20variables
// https://caniuse.com/?search=svg
// https://caniuse.com/?search=es6

Vue.use(VueBrowserUpdate, {
  options: {
    required: {
      // ie / edge
      i: 19,
      // firefox
      f: 54,
      // opera
      o: 38,
      // safari
      s: 10,
      // chrome
      c: 51,
    },
    insecure: true,
    unsupported: true,
    style: 'corner',
  },
  test: true,
});
