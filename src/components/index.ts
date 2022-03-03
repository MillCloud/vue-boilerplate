import type { PluginObject } from 'vue';
import { Icon } from '@iconify/vue2';

const Components: PluginObject<any> = {
  install: (Vue) => {
    Vue.component('VIcon', Icon);
  },
};

export default Components;
