import Vue from 'vue';
import Element from 'element-ui';
// @ts-ignore
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(Element, { size: 'small' });
Vue.component(CollapseTransition.name, CollapseTransition);
