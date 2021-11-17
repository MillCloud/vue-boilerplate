// @ts-ignore
import VueBrowserUpdate from '@sum.cumo/vue-browserupdate';
import Vue from 'vue';

Vue.use(VueBrowserUpdate, {
  options: {
    required: {
      // ie / edge
      i: 79,
      // firefox
      f: 67,
      // opera
      o: 50,
      // safari
      s: 12,
      // chrome
      c: 63,
    },
    insecure: true,
    unsupported: true,
    style: 'corner',
  },
});
