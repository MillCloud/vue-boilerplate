<template>
  <el-main class="flex justify-center align-center">
    <el-row>
      <el-col class="text-center">
        <h6 class="text-lg">404 Not Found</h6>
      </el-col>
      <el-col class="mt-2 text-center">
        <el-button @click="handleGoBack">返回</el-button>
        <el-button class="mx-2" @click="handleToIndex">首页</el-button>
        <el-button @click="handleToHome">主页</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import { useRouter } from 'vue2-helpers/vue-router';

const router = useRouter();

export default {
  methods: {
    handleGoBack() {
      router.go(-1);
    },
    handleToIndex() {
      router.replace('/');
    },
    handleToHome() {
      router.replace('/home');
    },
  },
};
</script>

<route lang="json">
{
  "meta": {
    "isHidden": true
  }
}
</route>
