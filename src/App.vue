<template>
  <div id="app">
    <router-view />
    <vue-query-dev-tools />
  </div>
</template>

<script setup lang="ts">
import { useQueryProvider, QueryClient, QueryCache, MutationCache } from 'vue-query';
import { VueQueryDevTools } from 'vue-query/devtools';
import { axiosInstance, showError } from '@/utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showError(error as IResponseError);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showError(error as IResponseError);
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosInstance.request<IResponseData>({
          method: 'GET',
          url: queryKey[0] as string,
          params: queryKey[1] as Record<string, any>,
          data: queryKey[1] as Record<string, any>,
        });
        if (!data.success && ((queryKey[1] as Record<string, any>)?.showError ?? true)) {
          showError(
            (data as unknown) as IResponseError,
            (queryKey[1] as Record<string, any>)?.showErrorType,
          );
        }
        return data;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        const { data } = await axiosInstance.request<IResponseData>({
          method: 'POST',
          ...(variables as Record<string, any>),
        });
        if (!data.success && ((variables as Record<string, any>)?.showError ?? true)) {
          showError(
            (data as unknown) as IResponseError,
            (variables as Record<string, any>)?.showErrorType,
          );
        }
        return data;
      },
    },
  },
});

useQueryProvider(queryClient);
</script>
