<template>
  <el-row>
    <el-col class="text-center">
      <h6 class="text-lg">404 Not Found</h6>
    </el-col>
    <el-col class="mt-2 text-center">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button class="mx-2" @click="$router.replace('/')">首页</el-button>
      <el-button @click="$router.replace('/home')">主页</el-button>
    </el-col>
  </el-row>
</template>

<route lang="json">
{
  "meta": {
    "isHidden": true
  }
}
</route>
