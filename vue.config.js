const fs = require('fs');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const UnpluginVue2ScriptSetupPlugin = require('unplugin-vue2-script-setup/webpack');

const arrGZipExtension = [
  'html',
  'js',
  'css',
  'ttf',
  'eot',
  'otf',
  'woff',
  'woff2',
  'png',
];

module.exports = {
  chainWebpack: (config) => {
    config.plugin('stylelint').use(StylelintPlugin, [
      {
        files: ['src/**/*.{css,less,sass,scss,vue}'],
        fix: true,
      },
    ]);
    config
      .plugin('unplugin-vue2-script-setup')
      .use(UnpluginVue2ScriptSetupPlugin({}));
    config.resolve.alias
      .set('@@', path.resolve(''))
      .set('@', path.resolve('src'));
    config.when(process.env.NODE_ENV === 'production', (config_) => {
      config_
        .plugin('compression')
        .use(CompressionPlugin, [
          { test: new RegExp(`\\.(${arrGZipExtension.join('|')})$`) },
        ]);
      config_.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        return args;
      });
      config_.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            name: 'chunk-vendors',
            priority: 10,
            test: /[/\\]node_modules[/\\]/,
          },
          element: {
            name: 'chunk-element',
            priority: 20,
            test: /[/\\]node_modules[/\\]_?element(.*)/,
          },
          components: {
            minChunks: 2,
            name: 'chunk-components',
            priority: 5,
            reuseExistingChunk: true,
            test: path.resolve('src', 'components'),
          },
        },
      });
    });
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    host: 'localhost',
    proxy: process.env.VUE_APP_REQUEST_BASE_URL || 'https://fake.url',
    https: {
      key: fs.readFileSync(path.resolve('src', 'assets', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve('src', 'assets', 'localhost.pem')),
    },
  },
  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE || 'zh-Hans',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-Hans',
      localeDir: 'i18n/locales',
      enableInSFC: false,
    },
    autoRouting: {
      chunkNamePrefix: 'page-',
    },
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
};
