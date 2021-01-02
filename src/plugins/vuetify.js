import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { getLanguage } from '@u/storage';
import i18n from '@/i18n';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    current: getLanguage(),
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    options: {
      customProperties: true,
    },
  },
});
