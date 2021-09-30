<template>
  <div id="app">
    <router-view />
    <vue-query-dev-tools />
  </div>
</template>

<script setup lang="ts">
import { useQueryProvider } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';
import { queryClient } from '@/utils';

useQueryProvider(queryClient);
</script>
