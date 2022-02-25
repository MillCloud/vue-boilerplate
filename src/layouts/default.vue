<template>
  <el-container class="relative h-screen bg-gray-100">
    <el-main class="p-20">
      <router-view />
    </el-main>
    <el-footer class="flex items-center justify-center">
      <template v-if="network.isSupported">
        <Icon
          :class="{ 'text-danger': networkText.includes('请检查') }"
          icon="carbon:network-public"
          class="el-icon- mr-2"
        />
        <span class="mr-4" :class="{ 'text-danger': networkText.includes('请检查') }">
          {{ networkText }}
        </span>
      </template>
      <Icon icon="carbon:version" class="el-icon- mr-2" />
      <span class="mr-4">v{{ pkg.version }}</span>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, computed } from '@vue/composition-api';
import { useNetwork } from '@vueuse/core';
import { Icon } from '@iconify/vue2';
import pkg from '@/../package.json';

const network = reactive(useNetwork());
const networkText = computed(() => {
  if (!network.isSupported) {
    return '';
  }
  if (!network.isOnline) {
    return '网络异常，请检查';
  }
  if (network.effectiveType !== '4g') {
    return '网络慢，请检查';
  }
  return '网络正常';
});
</script>
