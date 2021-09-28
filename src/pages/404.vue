<template>
  <el-main class="flex justify-center align-center">
    <el-row>
      <el-col text="center">
        <h6 class="prose-lg">404 Not Found</h6>
      </el-col>
      <el-col text="center" m="t-2">
        <el-button @click="handleGoBack">{{ $t('hint.back') }}</el-button>
        <el-button class="mx-2" @click="handleToIndex">
          {{ $t('hint.index') }}
        </el-button>
        <el-button @click="handleToHome">{{ $t('hint.home') }}</el-button>
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
