<template>
  <el-main>
    <el-row class="flex justify-center items-center my-0">
      <h6 class="prose-lg">这里是主页</h6>
    </el-row>
    <el-row class="flex justify-center items-center my-0">
      <el-image
        alt="Vue logo"
        fit="fill"
        lazy
        src="https://cn.vuejs.org/images/logo.png"
        class="w-64 h-64"
      />
    </el-row>
    <HelloWorld msg="Welcome to Your Vue.js v2 App" />
  </el-main>
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
