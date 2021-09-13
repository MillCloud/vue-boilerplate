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

const keyLanguage = 'language';

/** @return {string} language */
export function getLanguage() {
  return getItem({
    key: keyLanguage,
    defaultValue: process.env.VUE_APP_I18N_LOCALE,
  });
}

/** @param {string} language */
export function setLanguage(language = process.env.VUE_APP_I18N_LOCALE) {
  setItem({ key: keyLanguage, value: language });
}
