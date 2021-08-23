<template>
  <el-main>
    <el-row flex="~" class="justify-center items-center" m="y-0">
      <h6 class="prose-lg">这里是首页</h6>
    </el-row>
    <el-row flex="~" class="justify-center items-center" m="y-0">
      <el-image
        alt="Vue logo"
        fit="fill"
        lazy
        src="https://cn.vuejs.org/images/logo.png"
        h="200px"
        w="200px"
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
