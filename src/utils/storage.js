export function getItem({
  storage = localStorage,
  key = '',
  defaultValue = '',
}) {
  return storage.getItem(key) || defaultValue;
}

export function setItem({ storage = localStorage, key = '', value = '' }) {
  storage.setItem(key, value);
}

export function clear({ storage = localStorage }) {
  storage.clear();
}

const keyToken = 'token';

/**
 * @return {string} token
 */
export function getToken() {
  return getItem({ key: keyToken });
}

/**
 * @param {string} token
 */
export function setToken(token) {
  setItem({ key: keyToken, value: token });
}
