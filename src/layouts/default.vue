<template>
  <el-container min-h="screen" pos="relative">
    <el-aside width="256px" pos="fixed" h="screen" z="5">
      <el-header flex="~" align="items-center">
        <h5 class="mr-8 prose-xl">boilerplate-vue</h5>
      </el-header>
    </el-aside>
    <el-container>
      <el-header
        flex="~"
        align="items-center"
        pos="fixed"
        left="256px"
        w="full"
        bg="white"
        z="5"
      >
        <router-link to="/" exact>Index</router-link>
        <router-link to="/home" exact class="ml-2">Home</router-link>
      </el-header>
      <router-view />
      <el-footer flex="~" justify="center" align="items-center" p="l-256px">
        <a
          class="mx-2"
          href="https://github.com/MillCloud/boilerplate-vue"
          target="_blank"
          rel="noopener noreferrer"
          >Github</a
        >
        <a
          class="mx-2"
          href="https://gitee.com/MillCloud/boilerplate-vue"
          target="_blank"
          rel="noopener noreferrer"
          >Gitee</a
        >
      </el-footer>
    </el-container>
  </el-container>
</template>
