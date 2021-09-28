<template>
  <div id="app">
    <router-view />
    <vue-query-dev-tools />
  </div>
</template>

<script setup lang="ts">
import { useQueryProvider, QueryClient } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';
import type { AxiosResponse, AxiosPromise } from 'axios';
import { request } from '@/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // queryFn: async ({ queryKey, pageParam }) => {
      //   console.log('');
      //   console.log('queryKey', queryKey);
      //   console.log('pageParam', pageParam);
      //   console.log('');
      //   const { data } = (await request({
      //     method: 'GET',
      //     url: queryKey[0] as string,
      //     params: pageParam,
      //   })) as AxiosResponse<Response>;
      //   return data;
      // },
      queryFn: async ({ queryKey, pageParam }) => {
        const { data } = (await request({
          method: 'GET',
          url: queryKey[0] as string,
          params: pageParam,
        })) as AxiosResponse<Response>;
        return data;
      },
    },
    mutations: {
      // mutationFn: async (variables) => {
      //   console.log('');
      //   console.log('variables', variables);
      //   console.log('');
      //   return request({
      //     method: 'POST',
      //     ...(variables as Record<string, any>),
      //   }) as AxiosPromise<Response>;
      // },
      mutationFn: async (variables) =>
        request({
          method: 'POST',
          ...(variables as Record<string, any>),
        }) as AxiosPromise<Response>,
    },
  },
});

useQueryProvider(queryClient);
</script>
