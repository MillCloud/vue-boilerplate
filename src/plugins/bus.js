import Vue from 'vue';
import mitt from 'mitt';

Vue.prototype.$bus = mitt();
