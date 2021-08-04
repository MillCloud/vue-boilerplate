import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import i18n from '@/i18n';
import { getToken, clear as clearStorage } from '@/utils';
import statuses from 'statuses';
import { constantCase } from '@modyqyw/utils';
import { setupCache } from 'axios-cache-adapter';
import * as AxiosLogger from 'axios-logger';
import axiosRetry from 'axios-retry';
import pkg from '@@/package.json';

// https://github.com/axios/axios
// 要取消请求，参考 https://github.com/axios/axios#cancellation 第二种方式

/** @desc 需要返回到首页并清空登录信息的响应代码 */
export const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

/** @desc 错误统一处理方法 */
export const handleShowError = (response) => {
  if (reLaunchCodes.has(response.code)) {
    clearStorage();
    router.replace('/');
  } else {
    console.error(response.message);
  }
};

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  invalidate: async (config, request) => {
    if (request.clearCacheEntry) {
      try {
        // @ts-ignore
        await config.store.removeItem(config.uuid);
        // eslint-disable-next-line no-empty
      } catch {}
    }
  },
});

/** @desc 请求实例 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_REQUEST_TIMEOUT || '10000') || 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${pkg.name}/${pkg.version}`,
  },
  adapter: cache.adapter,
});

instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Token': getToken() || '',
  },
}));
instance.interceptors.request.use(
  (request) => AxiosLogger.requestLogger(request, { prefixText: false }),
  (error) => AxiosLogger.errorLogger(error, { prefixText: false }),
);
axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay });

instance.interceptors.response.use(
  (response) => AxiosLogger.responseLogger(response, { prefixText: false }),
  (error) => AxiosLogger.errorLogger(error, { prefixText: false }),
);
instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (!data.success && config.showError !== false) {
      handleShowError(data);
    }
    return data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // 取消请求
      return {
        success: false,
        message: i18n.t('error.REQUEST_CANCELLED'),
        code: 'REQUEST_CANCELLED',
      };
    }
    const response = {
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
          response.code = constantCase(statuses(status));
          response.message = i18n.t(`error.${constantCase(statuses(status))}`);
        } catch {
          response.code = 'ERROR_OCCURRED';
          response.message = i18n.t(`error.ERROR_OCCURRED`);
        }
      } else {
        // 超时
        const timeoutCodes = ['TIMEOUT', 'CONNRESET'];
        const strError = JSON.stringify(error).toUpperCase();
        for (let i = 0, len = timeoutCodes.length; i < len; i += 1) {
          if (strError.includes(timeoutCodes[i])) {
            response.code = 'REQUEST_TIMEOUT';
            response.message = i18n.t('error.REQUEST_TIMEOUT');
            break;
          }
        }
      }
    } else if (error.request) {
      // 发送了请求，没有收到响应
      response.code = 'NO_RESPONSE';
      response.message = i18n.t('error.NO_RESPONSE');
    } else {
      // 请求时发生错误
      response.code = 'REQUEST_ERROR';
      response.message = i18n.t('error.REQUEST_ERROR');
    }
    // 处理错误
    if (error.config.showError !== false) {
      handleShowError(response);
    }
    return response;
  },
);

Vue.prototype.$request = instance;

export default instance;
