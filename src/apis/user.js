import request from '@/plugins/request';
import axios from 'axios';

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
  });
  r.prototype.abort = abort;
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
  r.prototype.abort = abort;
  return r;
}

export default {
  signIn,
  signUp,
};
