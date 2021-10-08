function getItem({ storage = localStorage, key = '', defaultValue = '' }) {
  return storage.getItem(key) || defaultValue;
}

function setItem({ storage = localStorage, key = '', value = '' }) {
  storage.setItem(key, value);
}

export function clearStorage({ storage = localStorage } = {}) {
  storage.clear();
}

const keyToken = 'token';

export function getToken() {
  return getItem({ key: keyToken });
}

export function setToken(token = '') {
  setItem({ key: keyToken, value: token });
}

const isAsideCollapsedKey = 'isAsideCollapsed';

export function getIsAsideCollapsed(): boolean {
  return JSON.parse(getItem({ key: isAsideCollapsedKey }) || 'false');
}

export function setIsAsideCollapsed(isAsideCollapsed = false) {
  setItem({ key: isAsideCollapsedKey, value: JSON.stringify(isAsideCollapsed) });
}
