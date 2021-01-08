import request from '@/plugins/request';
import axios from 'axios';

// 考虑到取消请求是较为少数的情况，可以这么处理
const { CancelToken } = axios;

export function signIn({ username, password }) {
  let abort;
  const r = request({
    url: '/api/sign-in',
    data: {
      username,
      password,
    },
    cancelToken: new CancelToken((c) => {
      abort = c;
    }),
    // 不要自动处理错误，手动处理
    showError: false,
  });
  // 供取消请求
  r.abort = abort;
  return r;
}

export function signUp({ email, username, nickname, password }) {
  let abort;
  const r = request({
    url: '/api/sign-up',
    data: {
      email,
      username,
      nickname,
      password,
    },
    cancelToken: new CancelToken((c) => {
      abort = c;
    }),
  });
  r.abort = abort;
  return r;
}

export default {
  signIn,
  signUp,
};
