import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import { getToken, clear as clearStorage } from '@u/storage';
import packageInfo from '../../package.json';

// https://github.com/axios/axios#readme
// 要取消请求，参考 https://github.com/axios/axios#cancellation 第二种方式

const reLaunchCodes = new Set(['YOUR_RELAUNCH_CODE']);

const timeoutCodes = ['TIMEOUT', 'CONNRESET'];

const objectStatusCode = {
  403: '不允许访问',
  404: '请求的接口不存在',
  500: '服务器内部错误',
};

const handleValidateStatusCode = (statusCode) =>
  (statusCode >= 200 && statusCode < 300) || statusCode === 304;

const handleShowError = (response) => {
  if (reLaunchCodes.has(response.code)) {
    clearStorage();
    router.replace('/');
    console.info('请重新登录');
  } else {
    console.error(response.message);
  }
};

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: JSON.parse(process.env.VUE_APP_TIMEOUT),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${packageInfo.name}/${packageInfo.version}`,
  },
  withCredentials: false,
  responseType: 'json',
  responseEncoding: 'utf8',
  validateStatus: handleValidateStatusCode,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      'X-Token': token || '',
    },
  };
});

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (!data.success) {
      handleShowError(data);
    }
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // 取消请求
      return {
        success: false,
        message: '请求已取消',
        code: 'REQUEST_CANCELLED',
      };
    }
    const response = {
      success: false,
      message: '',
      code: '',
    };
    if (response.response) {
      // 发送了请求且有响应
      const { status } = error.response;
      if (!handleValidateStatusCode(status)) {
        // 状态码不正常
        response.message =
          objectStatusCode[status] || `发生了错误，状态码${status}`;
        response.code = 'INVALID_STATUS_CODE';
      } else {
        // 超时
        const strError = JSON.stringify(error);
        for (let i = 0, len = timeoutCodes.length; i < len; i += 1) {
          if (strError.includes(timeoutCodes[i])) {
            response.message = '请求超时';
            response.code = 'REQUEST_TIMEOUT';
            break;
          }
        }
      }
    } else if (response.request) {
      // 发送了请求，没有收到响应
      response.message = `服务器无响应，请稍后再试`;
      response.code = 'NO_RESPONSE';
    } else {
      // 请求时发生错误
      response.message = '请求错误';
      response.code = 'REQUEST_ERROR';
    }
    // 处理错误
    handleShowError(response);
    return response;
  },
);

Vue.prototype.$request = instance;

export default instance;
