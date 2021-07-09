import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import i18n from '@/i18n';
import { getToken, clear as clearStorage } from '@/utils';
import statuses from 'statuses';
import { constantCase } from '@modyqyw/utils';
import axiosRetry from 'axios-retry';
import packageInfo from '../../package.json';

// https://github.com/axios/axios#readme
// 要取消请求，参考 https://github.com/axios/axios#cancellation 第二种方式

/** @desc 需要返回到首页并清空登录信息的响应代码 */
export const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

/** @param {number} statusCode */
const handleValidateStatusCode = (statusCode) =>
  (statusCode >= 200 && statusCode < 300) || statusCode === 304;

/** @desc 错误统一处理方法 */
export const handleShowError = (response) => {
  if (reLaunchCodes.has(response.code)) {
    clearStorage();
    router.replace('/');
  } else {
    console.error(response.message);
  }
};

/** @desc 请求实例 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_REQUEST_TIMEOUT || '10000') || 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${packageInfo.name}/${packageInfo.version}`,
  },
  withCredentials: false,
  responseType: 'json',
  validateStatus: handleValidateStatusCode,
});

instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Token': getToken() || '',
  },
}));

axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay });

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
      let { status } = error.response;
      if (!handleValidateStatusCode(status)) {
        // 状态码不正常
        status = JSON.stringify(status);
        response.code = status;
        response.message = statuses(status)
          ? i18n.t(`error.${constantCase(statuses(status))}`)
          : i18n.t('error.ERROR_OCCURRED');
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
