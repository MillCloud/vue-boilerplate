<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center" align="center" class="my-0">
        <h6 class="text-h6">这里是主页</h6>
      </v-row>
      <v-img
        alt="Vue logo"
        lazy-src="https://cn.vuejs.org/images/logo.png"
        src="https://cn.vuejs.org/images/logo.png"
        height="200"
        width="200"
        class="mx-auto"
      />
      <HelloWorld msg="Welcome to Your Vue.js v2 App" />
    </v-container>
  </v-main>
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
