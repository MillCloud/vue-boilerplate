import axios from 'axios';
import { MessageBox, Notification, Message } from 'element-ui';
import { QueryClient, QueryCache, MutationCache } from 'vue-query';
import { isRef, isReactive, unref } from '@vue/composition-api';
import { isArray, isObject } from '@modyqyw/utils';
import { removeToken, getToken } from './storage';
import router from '@/router';
import { DefaultHeaders } from '@/data';

const reSignInCodes = new Set(['TOKEN_OUTDATED']);

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_REQUEST_TIMEOUT || '10000') || 10_000,
  headers: {
    ...DefaultHeaders,
  },
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
  const content = `错误代码：${error?.code ?? error?.response?.data?.code ?? '无'}，错误信息：${
    error?.message ?? error?.response?.data?.message ?? '无'
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
          params = {
            ...params,
            ...unref(queryKey[2] as Record<string, any>),
          };
        }
        Object.keys(params).forEach((key) => {
          if (['', 'undefined', 'null', undefined, null].includes(params[key])) {
            delete params[key];
          } else {
            params = {
              ...params,
              [key]: params[key],
            };
          }
        });
        let config: Record<string, any> = {};
        if (isReactive(queryKey[3]) || isRef(queryKey[3]) || isObject(queryKey[3])) {
          config = {
            ...config,
            ...unref(queryKey[3] as Record<string, any>),
          };
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
              (data as unknown) as IResponseError,
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
          ...(unref(variables) as Record<string, any>),
        });
        if (!data.success) {
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
              (data as unknown) as IResponseError,
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
