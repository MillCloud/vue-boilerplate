import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import i18n from '@/i18n';
import { getToken, clear as clearStorage } from '@/utils';
import packageInfo from '../../package.json';

// https://github.com/axios/axios#readme
// 要取消请求，参考 https://github.com/axios/axios#cancellation 第二种方式

/** @desc 需要返回到首页并清空登录信息的响应代码 */
export const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

/** @desc 状态码对应的国际化键 */
export const objectStatusCode = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_ALLOWED',
  406: 'NOT_ACCEPTABLE',
  407: 'PROXY_AUTHENTICATION_REQUIRED',
  408: 'REQUEST_TIMEOUT',
  409: 'CONFLICT',
  410: 'GONE',
  411: 'LENGTH_REQUIRED',
  412: 'PRECONDITION_FAILED',
  413: 'PAYLOAD_TOO_LARGE',
  414: 'URI_TOO_LONG',
  415: 'UNSUPPORTED_MEDIA_TYPE',
  416: 'RANGE_NOT_SATISFIABLE',
  417: 'EXPECTATION_FAILED',
  421: 'MISDIRECTED_REQUEST',
  422: 'UNPROCESSABLE_ENTITY',
  423: 'LOCKED',
  424: 'FAILED_DEPENDENCY',
  426: 'UPGRADE_REQUIRED',
  428: 'PRECONDITION_REQUIRED',
  429: 'TOO_MANY_REQUESTS',
  431: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  451: 'UNAVAILABLE_FOR_LEGAL_REASONS',
  500: 'INTERNAL_SERVER_ERROR',
  501: 'NOT_IMPLEMENTED',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
  505: 'HTTP_VERSION_NOT_SUPPORTED',
  506: 'VARIANT_ALSO_NEGOTIATES',
  507: 'INSUFFICIENT_STORAGE',
  508: 'LOOP_DETECTED',
  510: 'NOT_EXTENDED',
  511: 'NETWORK_AUTHENTICATION_REQUIRED',
};

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
  timeout: JSON.parse(process.env.VUE_APP_TIMEOUT || '10000') || 10000,
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
        response.message = objectStatusCode[status]
          ? i18n.t(`error.${objectStatusCode[status]}`)
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
