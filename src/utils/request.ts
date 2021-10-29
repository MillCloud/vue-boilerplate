import axios from 'axios';
import { MessageBox, Notification, Message } from 'element-ui';
import { QueryClient, QueryCache, MutationCache } from 'vue-query';
import { isRef, isReactive, toRaw } from '@vue/composition-api';
import { isObject } from '@modyqyw/utils';
import pkg from '@/../package.json';
import { clearStorage, getToken } from './storage';
import router from '@/router';

const reSignInCodes = new Set(['TOKEN_OUTDATED']);

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_REQUEST_TIMEOUT || '10000') || 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${pkg.name}/${pkg.version}`,
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
        // console.log('queryKey', queryKey);
        let url = `${queryKey[0]}`;
        if (isRef(queryKey[1])) {
          url += `${queryKey[1].value}`;
        } else if (Array.isArray(queryKey[1])) {
          queryKey[1].forEach((item, index) => {
            url = url.replace(`:${index}`, isRef(item) ? `${item.value}` : `${item}`);
          });
        }
        let params: Record<string, any> = {};
        if (isReactive(queryKey[2])) {
          params = {
            ...params,
            ...toRaw(queryKey[2] as Record<string, any>),
          };
        } else if (isRef(queryKey[2])) {
          params = {
            ...params,
            ...(queryKey[2].value as Record<string, any>),
          };
        } else if (isObject(queryKey[2])) {
          Object.keys(queryKey[2]).forEach((key) => {
            params = {
              ...params,
              // @ts-ignore
              [key]: isRef(queryKey[2][key])
                ? // @ts-ignore
                  encodeURIComponent(queryKey[2][key].value)
                : // @ts-ignore
                  encodeURIComponent(queryKey[2][key]),
            };
          });
        }
        const { data } = await instance.request<IResponseData>({
          method: 'GET',
          url,
          params,
        });
        if (!data.success) {
          if (reSignInCodes.has(data.code)) {
            clearStorage();
            showError({
              message: '请重新登录',
            } as IResponseError);
            router.push('/sign-in');
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
        if ((error as IResponseError).response?.status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('variables', variables);
        let config;
        if (isReactive(variables)) {
          config = toRaw(variables) as Record<string, any>;
        } else if (isRef(variables)) {
          config = variables.value as Record<string, any>;
        } else {
          config = variables as Record<string, any>;
        }
        const { data } = await instance.request<IResponseData>({
          method: 'POST',
          ...config,
        });
        if (!data.success) {
          if (reSignInCodes.has(data.code)) {
            clearStorage();
            showError({
              message: '请重新登录',
            } as IResponseError);
            router.push('/sign-in');
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
        if ((error as IResponseError).response?.status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
