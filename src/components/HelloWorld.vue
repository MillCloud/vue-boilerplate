<template>
  <el-row>
    <el-col>
      <h3 class="text-2xl text-center">{{ msg }}</h3>
    </el-col>
    <el-col>
      <p class="text-center">
        For a guide and recipes on how to configure / customize this project, check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener noreferrer">
          vue-cli documentation
        </a>
      </p>
    </el-col>
    <el-col class="mt-2">
      <h6 class="text-lg text-center">Installed CLI Plugins</h6>
    </el-col>
    <el-col class="text-center">
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
        target="_blank"
        rel="noopener noreferrer"
        >babel</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
        target="_blank"
        rel="noopener noreferrer"
        >router</a
      >
      <a
        class="mx-2"
        href="https://github.com/ktsn/vue-cli-plugin-auto-routing"
        target="_blank"
        rel="noopener noreferrer"
        >auto-routing</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
        target="_blank"
        rel="noopener noreferrer"
        >vuex</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-typescript"
        target="_blank"
        rel="noopener noreferrer"
        >typescript</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
        target="_blank"
        rel="noopener noreferrer"
        >eslint</a
      >
      <a
        class="mx-2"
        href="https://github.com/intlify/vue-cli-plugin-i18n"
        target="_blank"
        rel="noopener noreferrer"
        >i18n</a
      >
    </el-col>
    <el-col class="mt-2">
      <h6 class="text-lg text-center">Ecosystem</h6>
    </el-col>
    <el-col class="text-center">
      <a class="mx-2" href="https://cn.vuejs.org" target="_blank" rel="noopener noreferrer">vue</a>
      <a class="mx-2" href="https://router.vuejs.org/zh/" target="_blank" rel="noopener noreferrer"
        >vue-router</a
      >
      <a class="mx-2" href="https://vuex.vuejs.org/zh/" target="_blank" rel="noopener noreferrer"
        >vuex</a
      >
      <a class="mx-2" href="https://vueuse.js.org/" target="_blank" rel="noopener noreferrer"
        >vue-use</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-devtools"
        target="_blank"
        rel="noopener noreferrer"
        >vue-devtools</a
      >
      <a
        class="mx-2"
        href="https://vue-loader.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-loader</a
      >
      <a class="mx-2" href="https://element.eleme.cn/" target="_blank" rel="noopener noreferrer"
        >element</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/awesome-vue"
        target="_blank"
        rel="noopener noreferrer"
        >awesome-vue</a
      >
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  msg: {
    type: String,
    default: () => '',
  },
});
</script>

<!-- <script lang="ts">
// export default {
//   name: 'HelloWorld',
//   props: {
//     msg: {
//       type: String,
//       default: () => '',
//     },
//   },
// };
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* stylelint-disable declaration-no-important */
ul {
  padding: 0 !important;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
