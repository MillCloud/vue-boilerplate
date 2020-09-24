import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocales from 'element-ui/lib/locale/lang/en';
import elementZhHansLocales from 'element-ui/lib/locale/lang/zh-CN';
import elementZhHantLocales from 'element-ui/lib/locale/lang/zh-TW';
import vuetifyEnLocales from 'vuetify/es5/locale/en';
import vuetifyZhHansLocales from 'vuetify/es5/locale/zh-Hans';
import vuetifyZhHantLocales from 'vuetify/es5/locale/zh-Hant';
import vxeTableEnLocales from 'vxe-table/lib/locale/lang/en-US';
import vxeTableZhHansLocales from 'vxe-table/lib/locale/lang/zh-CN';
import vxeTableZhHantLocales from 'vxe-table/lib/locale/lang/zh-HK';

Vue.use(VueI18n);

const elementI18n = {
  en: elementEnLocales,
  'zh-Hans': elementZhHansLocales,
  'zh-Hant': elementZhHantLocales,
};

const vuetifyI18n = {
  en: vuetifyEnLocales,
  'zh-Hans': vuetifyZhHansLocales,
  'zh-Hant': vuetifyZhHantLocales,
};

const vxeTableI18n = {
  en: vxeTableEnLocales,
  'zh-Hans': vxeTableZhHansLocales,
  'zh-Hant': vxeTableZhHantLocales,
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
        ...vuetifyI18n[locale],
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
