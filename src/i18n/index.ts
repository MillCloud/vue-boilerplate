import Vue from 'vue';
import VueI18n from 'vue-i18n';
// @ts-ignore
import elementEnLocales from 'element-ui/lib/locale/lang/en';
// @ts-ignore
import elementZhCnLocales from 'element-ui/lib/locale/lang/zh-CN';
import { getLanguage } from '@/utils';

Vue.use(VueI18n);

const i18nMessages = {
  en: {
    ...elementEnLocales,
  },
  'zh-Hans': {
    ...elementZhCnLocales,
  },
};

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[\s\w,-]+\.json$/i);
  const messages: Record<string, any> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([\w-]+)\./);
    if (matched && matched.length > 1) {
      const locale = matched[1] as 'en' | 'zh-Hans';
      messages[locale] = {
        ...locales(key),
        ...i18nMessages[locale],
      };
    }
  });
  return messages;
}

export default new VueI18n({
  locale: getLanguage() || process.env.VUE_APP_I18N_LOCALE || 'zh-Hans',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-Hans',
  messages: loadLocaleMessages(),
});
