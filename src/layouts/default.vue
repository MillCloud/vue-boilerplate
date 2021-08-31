<template>
  <el-container class="relative min-h-screen">
    <el-aside class="fixed w-64 h-screen z-20">
      <el-header class="flex items-center">
        <h5 class="mr-8 prose-xl">boilerplate-vue</h5>
      </el-header>
    </el-aside>
    <el-container>
      <el-header class="fixed w-full flex items-center bg-white z-10">
        <router-link to="/" exact>Index</router-link>
        <router-link to="/home" exact class="ml-2">Home</router-link>
      </el-header>
      <router-view />
      <el-footer class="flex justify-center items-center z-10">
        <a
          class="mx-2"
          href="https://github.com/MillCloud/boilerplate-vue"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          class="mx-2"
          href="https://gitee.com/MillCloud/boilerplate-vue"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gitee
        </a>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  > .el-header,
  > .el-main,
  > .el-footer {
    padding-left: 276px;
  }

  > .el-main {
    padding-top: 80px;
  }
}
</style>
