import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocales from 'element-ui/lib/locale/lang/en';
import elementZhCNLocales from 'element-ui/lib/locale/lang/zh-CN';
import elementZhHKLocales from 'element-ui/lib/locale/lang/zh-TW';
import vxeTableEnLocales from 'vxe-table/lib/locale/lang/en-US';
import vxeTableZhCNLocales from 'vxe-table/lib/locale/lang/zh-CN';
import vxeTableZhHKLocales from 'vxe-table/lib/locale/lang/zh-HK';

Vue.use(VueI18n);

const elementI18n = {
  en: elementEnLocales,
  'zh-CN': elementZhCNLocales,
  'zh-HK': elementZhHKLocales,
};

const vxeTableI18n = {
  en: vxeTableEnLocales,
  'zh-CN': vxeTableZhCNLocales,
  'zh-HK': vxeTableZhHKLocales,
};

function loadLocaleMessages() {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...locales(key),
        ...elementI18n[locale],
        ...vxeTableI18n[locale],
      };
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
