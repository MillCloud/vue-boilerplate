/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

const fs = require('fs');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const UnpluginVueComponentsPlugin = require('unplugin-vue-components/webpack');
// const { ElementUiResolver } = require('unplugin-vue-components/resolvers');
const UnpluginIconsPlugin = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const UnpluginVue2ScriptSetupPlugin = require('unplugin-vue2-script-setup/webpack');

/** @type {Options} */
module.exports = {
  chainWebpack: (config) => {
    // stylelint
    config.plugin('stylelint').use(StylelintPlugin, [
      {
        files: ['src/**/*.{css,less,sass,scss,vue}'],
        fix: true,
      },
    ]);
    // unplugin-vue-components
    config.plugin('unplugin-vue-components').use(
      UnpluginVueComponentsPlugin({
        resolvers: [
          IconsResolver({
            defaultClass: 'el-icon-',
          }),
          // ElementUiResolver(),
        ],
      }),
    );
    // unplugin-icons
    config.plugin('unplugin-icons').use(
      UnpluginIconsPlugin({
        compiler: 'vue2',
      }),
    );
    // unplugin-vue2-script-setup
    config.plugin('unplugin-vue2-script-setup').use(
      UnpluginVue2ScriptSetupPlugin({
        refTransform: true,
      }),
    );
    // alias
    config.resolve.alias.set('@', path.resolve('src'));
    // fork-ts-checker
    config.plugins.delete('fork-ts-checker');
    // production only
    config.when(process.env.NODE_ENV === 'production', (config_) => {
      // compression-webpack-plugin
      config_.plugin('compression').use(CompressionPlugin, [{ test: /\\.(html|css|js)$/i }]);
      // terser-webpack-plugin
      config_.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        return args;
      });
      // splitChunks
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
  transpileDependencies: true,
};
