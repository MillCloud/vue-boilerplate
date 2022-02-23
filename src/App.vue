<template>
  <div id="app" class="relative">
    <router-view />
    <vue-query-dev-tools />
  </div>
</template>

<script setup lang="ts">
import { VueQueryDevTools } from 'vue-query/devtools';
</script>
