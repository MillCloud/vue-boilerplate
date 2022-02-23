import Vue from 'vue';
import { VueQueryPlugin } from 'vue-query';
import { vueQueryPluginOptions } from '../utils/request';

Vue.use(VueQueryPlugin, vueQueryPluginOptions);
