/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

const fs = require('fs');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const UnpluginIconsPlugin = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const UnpluginVueComponentsPlugin = require('unplugin-vue-components/webpack');
const { ElementUiResolver } = require('unplugin-vue-components/resolvers');
const UnpluginVue2ScriptSetupPlugin = require('unplugin-vue2-script-setup/webpack');

/** @type {Options} */
const options = {
  chainWebpack: (config) => {
    // stylelint
    config.plugin('stylelint').use(StylelintPlugin, [
      {
        files: ['src/**/*.{css,less,sass,scss,vue}'],
        fix: true,
      },
    ]);
    config.plugin('unplugin-icons').use(
      UnpluginIconsPlugin({
        compiler: 'vue2',
      }),
    );
    // unplugin-vue-components
    config.plugin('unplugin-vue-components').use(
      UnpluginVueComponentsPlugin({
        dts: true,
        resolvers: [
          IconsResolver({
            defaultClass: 'el-icon-',
          }),
          ElementUiResolver,
        ],
      }),
    );
    // unplugin-vue2-script-setup
    config
      .plugin('unplugin-vue2-script-setup')
      .use(UnpluginVue2ScriptSetupPlugin({}));
    // alias
    config.resolve.alias
      .set('@@', path.resolve(''))
      .set('@', path.resolve('src'));
    config.when(process.env.NODE_ENV === 'production', (config_) => {
      config_
        .plugin('compression')
        .use(CompressionPlugin, [{ test: /\\.(html|css|js)$/i }]);
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

module.exports = options;
