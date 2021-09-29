<template>
  <div id="app">
    <router-view />
    <vue-query-dev-tools />
  </div>
</template>

<script setup lang="ts">
import { useQueryProvider, QueryClient } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';
import { MessageBox } from 'element-ui';
import { axiosInstance } from '@/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosInstance.request<IResponseData>({
          method: 'GET',
          url: queryKey[0] as string,
          params: queryKey[1] as Record<string, any>,
          data: queryKey[1] as Record<string, any>,
        });
        return data;
      },
      retry: (failureCount, error) => {
        if (failureCount >= 5) {
          MessageBox.alert(
            `错误代码：${(error as IResponseError)?.code ?? '无'}，错误信息：${
              (error as IResponseError)?.message ?? '无'
            }`,
            {
              title: '错误',
              type: 'error',
            },
          );
          return false;
        }
        return true;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        const { data } = await axiosInstance.request<IResponseData>({
          method: 'POST',
          ...(variables as Record<string, any>),
        });
        return data;
      },
      retry: (failureCount, error) => {
        if (failureCount >= 5) {
          MessageBox.alert(
            `错误代码：${(error as IResponseError)?.code ?? '无'}，错误信息：${
              (error as IResponseError)?.message ?? '无'
            }`,
            {
              title: '错误',
              type: 'error',
            },
          );
          return false;
        }
        return true;
      },
    },
  },
});

useQueryProvider(queryClient);
</script>
