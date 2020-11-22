import Vue from 'vue';
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import i18n from '@/i18n';
import '@/styles/vxe-table-variables.scss';

Vue.use(VXETable);

VXETable.setup({
  // 国际化内置提示语
  i18n: (key) => i18n.t(key),
});

VXETable.use(VXETablePluginElement);
