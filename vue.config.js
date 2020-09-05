/* eslint-disable no-param-reassign */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const prodGzipExt = [
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
  configureWebpack: (config) => {
    config.plugins.push(
      new StylelintPlugin({
        files: ['src/**/*.{vue,html,scss}'],
        fix: true,
      }),
    );
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      '@a': path.resolve(__dirname, 'src', 'assets'),
      '@c': path.resolve(__dirname, 'src', 'components'),
      '@m': path.resolve(__dirname, 'src', 'mixins'),
      '@u': path.resolve(__dirname, 'src', 'utils'),
      'element-ui': 'element-ui-eoi',
    };
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.plugins.push(
        new CompressionPlugin({
          test: new RegExp(`\\.(${prodGzipExt.join('|')})$`),
        }),
      );
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            name: 'chunk-vendors',
            priority: 10,
            test: /[\\/]node_modules[\\/]/,
          },
          element: {
            name: 'chunk-element',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          components: {
            minChunks: 2,
            name: 'chunk-components',
            priority: 5,
            reuseExistingChunk: true,
            test: path.resolve('src', 'components'),
          },
        },
      };
    }
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },

  // public path
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/' // production
      : '/', // development
};
