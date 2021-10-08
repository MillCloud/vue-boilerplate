import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import statuses from 'statuses';
import { MessageBox } from 'element-ui';
import { constantCase } from '@modyqyw/utils';
import * as AxiosLogger from 'axios-logger';
import axiosRetry from 'axios-retry';
import { useAxios } from '@vueuse/integrations';
import pkg from '@/../package.json';
import { getToken, clearStorage } from '@/utils';
import router from '@/router';

interface AdvancedRequestConfig extends AxiosRequestConfig {
  clearCacheEntry?: boolean;
  showError?: boolean;
}

interface AdvancedResponse extends AxiosResponse<IResponseData> {
  config: AdvancedRequestConfig;
}

interface AdvancedError extends AxiosError<IResponseData> {
  config: AdvancedRequestConfig;
}

export const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

export const handleShowError = (response: IResponseData) => {
  if (reLaunchCodes.has(response.code)) {
    MessageBox.alert(`请重新登录`, {
      title: '错误',
      type: 'error',
    });
    clearStorage();
    router.replace('/');
  } else {
    MessageBox.alert(`错误代码：${response.code}，错误信息：${response.message}`, {
      title: '错误',
      type: 'error',
    });
  }
};

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
    'X-Token': getToken() || '',
  },
}));
if (process.env.NODE_ENV === 'development') {
  instance.interceptors.request.use(
    (request) => AxiosLogger.requestLogger(request, { prefixText: false }),
    (error) => AxiosLogger.errorLogger(error, { prefixText: false }),
  );
}
axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay });

if (process.env.NODE_ENV === 'development') {
  instance.interceptors.response.use(
    (response) => AxiosLogger.responseLogger(response, { prefixText: false }),
    (error) => AxiosLogger.errorLogger(error, { prefixText: false }),
  );
}
instance.interceptors.response.use(
  (response: AdvancedResponse) => {
    const { data, config } = response;
    if (!data.success && config.showError !== false) {
      handleShowError(data);
    }
    return data;
  },
  (error: AdvancedError) => {
    if (axios.isCancel(error)) {
      // 取消请求
      return {
        success: false,
        message: '请求取消',
        code: 'REQUEST_CANCELLED',
      };
    }
    const response: IResponseData = {
      success: false,
      message: '',
      code: '',
    };
    if (error.response) {
      // 发送了请求且有响应
      const { status } = error.response;
      if (status < 200 || status >= 300) {
        // 状态码不正常
        try {
          response.code = constantCase(statuses(status).toString());
          response.message = constantCase(statuses(status).toString());
        } catch {
          response.code = 'ERROR_OCCURRED';
          response.message = '发生了错误';
        }
      } else {
        // 超时
        const timeoutCodes = ['TIMEOUT', 'CONNRESET'];
        const errorText = JSON.stringify(error).toUpperCase();
        const timeoutCode = timeoutCodes.find((item) => errorText.includes(item));
        if (timeoutCode) {
          response.code = 'REQUEST_TIMEOUT';
          response.message = '请求超时';
        }
      }
    } else if (error.request) {
      // 发送了请求，没有收到响应
      response.code = 'NO_RESPONSE';
      response.message = '服务器无响应';
    } else {
      // 请求时发生错误
      response.code = 'REQUEST_ERROR';
      response.message = '请求错误';
    }
    // 处理错误
    if (error.config.showError !== false) {
      handleShowError(response);
    }
    return response;
  },
);

export const useRequest = (url: string, config: AdvancedRequestConfig) =>
  useAxios(url, config, instance);
