import Vue from 'vue';
import Element from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import i18n from '@/i18n';

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});
Vue.component(CollapseTransition.name, CollapseTransition);
