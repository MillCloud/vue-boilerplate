import axios from 'axios';
import { MessageBox, Notification, Message } from 'element-ui';
import { QueryClient, QueryCache, MutationCache } from 'vue-query';
import type { VueQueryPluginOptions } from 'vue-query';
import { isRef, isReactive, unref } from '@vue/composition-api';
import { isArray, isObject } from '@modyqyw/utils';
import qs from 'query-string';
import router from '@/router';
import { Headers } from '@/constants';
import { removeToken, getToken } from './storage';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL: process.env.VITE_REQUEST_BASE_URL || '',
  timeout: 30_000,
  headers: {
    ...Headers,
  },
  paramsSerializer: (params: Record<string, any>) =>
    qs.stringify(
      Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => !['', 'undefined', 'null', undefined, null].includes(v?.toString() ?? v),
        ),
      ),
    ),
});
instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    token: getToken() || '',
    'X-Token': getToken() || '',
  },
}));

export { instance as axiosInstance };

export const showError = (
  error: IResponseError,
  type: 'alert' | 'notification' | 'message' = 'alert',
) => {
  const content = `错误代码：${
    error?.code ??
    error?.response?.data?.code ??
    // @ts-ignore
    error?.response?.code ??
    error?.response?.status ??
    '无'
  }，错误信息：${
    // @ts-ignore
    error?.message ?? error?.response?.data?.message ?? error?.response?.message ?? '无'
  }。`;
  if (type === 'alert') {
    MessageBox.alert(content, {
      title: '错误',
      type: 'error',
    });
    return;
  }
  if (type === 'notification') {
    Notification.error({
      title: '错误',
      message: content,
    });
    return;
  }
  if (type === 'message') {
    Message.error({
      message: content,
    });
  }
};

export const queryClient = new QueryClient({
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
        // console.log('');
        // console.log('queryKey', queryKey);
        // console.log('');
        let url = `${queryKey[0]}`;
        if (isArray(queryKey[1])) {
          queryKey[1].forEach((item, index) => {
            url = url.replace(`:${index}`, `${unref(item)}`);
          });
        } else if (queryKey[1]) {
          url += `${unref(queryKey[1])}`;
        }
        let params: Record<string, any> = {};
        if (isReactive(queryKey[2]) || isRef(queryKey[2]) || isObject(queryKey[2])) {
          params = Object.fromEntries(
            Object.entries({
              ...params,
              ...unref(queryKey[2] as Record<string, any>),
            }).map(([k, v]) => [unref(k), unref(v)]),
          );
        }
        let config: Record<string, any> = {};
        if (isReactive(queryKey[3]) || isRef(queryKey[3]) || isObject(queryKey[3])) {
          config = Object.fromEntries(
            Object.entries({
              ...config,
              ...unref(queryKey[3] as Record<string, any>),
            }).map(([k, v]) => [unref(k), unref(v)]),
          );
        }
        const { data } = await instance.request<IResponseData>({
          method: 'GET',
          url,
          params,
          ...config,
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            removeToken();
            showError({
              message: '请重新登录',
            } as IResponseError);
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.fullPath),
              },
            });
          } else if ((queryKey[1] as Record<string, any>)?.showError ?? true) {
            showError(
              data as unknown as IResponseError,
              (queryKey[1] as Record<string, any>)?.showErrorType,
            );
          }
        }
        return data;
      },
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if ([403, 404, 500].includes((error as IResponseError).response?.status ?? 200)) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('');
        // console.log('variables', variables);
        // console.log('');
        const { data } = await instance.request<IResponseData>({
          method: 'POST',
          ...Object.fromEntries(
            Object.entries(unref(variables) as Record<string, any>).map(([k, v]) => [
              unref(k),
              unref(v),
            ]),
          ),
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            removeToken();
            showError({
              message: '请重新登录',
            } as IResponseError);
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.fullPath),
              },
            });
          } else if ((variables as Record<string, any>)?.showError ?? true) {
            showError(
              data as unknown as IResponseError,
              (variables as Record<string, any>)?.showErrorType,
            );
          }
        }
        return data;
      },
      retry: (failureCount, error) => {
        if ([403, 404, 500].includes((error as IResponseError).response?.status ?? 200)) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};
