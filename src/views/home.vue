<template>
  <v-main class="text-center">
    <v-img
      alt="Vue logo"
      lazy-src="https://cn.vuejs.org/images/logo.png"
      src="https://cn.vuejs.org/images/logo.png"
      max-height="200"
      max-width="200"
      class="mx-auto"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <v-btn v-if="isElectron" class="mt-2" @click="handleCloseElectronWindow">
      Close
    </v-btn>
  </v-main>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      isElectron: process.env.IS_ELECTRON,
    };
  },
  methods: {
    handleCloseElectronWindow() {
      window.ipcRenderer.send('window-closed');
    },
  },
};
</script>
