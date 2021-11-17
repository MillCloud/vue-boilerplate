function getItem({ storage = localStorage, key = '', defaultValue = '' }) {
  return storage.getItem(key) || defaultValue;
}

function setItem({ storage = localStorage, key = '', value = '' }) {
  storage.setItem(key, value);
}

function removeItem({ storage = localStorage, key = '' }) {
  storage.removeItem(key);
}

export function clearStorage({ storage = localStorage } = {}) {
  storage.clear();
}

const tokenKey = 'token';

export function getToken() {
  return getItem({ key: tokenKey });
}

export function setToken(token = '') {
  setItem({ key: tokenKey, value: token });
}

export function removeToken() {
  removeItem({ key: tokenKey });
}

const isAsideCollapsedKey = 'isAsideCollapsed';

export function getIsAsideCollapsed(): boolean {
  return JSON.parse(getItem({ key: isAsideCollapsedKey }) || 'false');
}

export function setIsAsideCollapsed(isAsideCollapsed = false) {
  setItem({ key: isAsideCollapsedKey, value: JSON.stringify(isAsideCollapsed) });
}

export function removeIsAsideCollapsed() {
  removeItem({ key: isAsideCollapsedKey });
}
