import Vue from 'vue';
import emitter from 'mitt';

Vue.prototype.$bus = emitter();
