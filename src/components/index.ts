import { Icon } from '@iconify/vue2';
import type { PluginObject } from 'vue';

const Components: PluginObject<any> = {
  install: (Vue) => {
    Vue.component('VIcon', Icon);
  },
};

export default Components;
