<template>
  <div class="text-center">
    <img
      alt="Vue logo"
      src="https://cn.vuejs.org/images/logo.png"
      class="mx-auto"
    />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
