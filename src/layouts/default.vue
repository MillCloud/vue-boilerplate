<template>
  <el-container class="relative min-h-screen">
    <el-aside class="fixed z-20 w-64 h-screen">
      <el-header class="flex items-center">
        <h5 class="mr-8 text-xl">boilerplate-vue2</h5>
      </el-header>
    </el-aside>
    <el-container class="relative flex-col min-h-screen">
      <el-header class="fixed z-10 flex items-center w-full bg-white">
        <router-link to="/" exact>Index</router-link>
        <router-link to="/home" exact class="ml-2">Home</router-link>
      </el-header>
      <router-view />
      <el-footer class="z-10 center">
        <a
          class="mx-2"
          href="https://github.com/MillCloud/boilerplate-vue2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          class="mx-2"
          href="https://gitee.com/MillCloud/boilerplate-vue2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gitee
        </a>
      </el-footer>
      <el-backtop />
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
    width: 100%;
    padding-top: 80px;
  }
}
</style>
