import path from 'path';
// import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
import vue2ScriptSetup from 'unplugin-vue2-script-setup/vite';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import vueComponents from 'unplugin-vue-components/vite';
import icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';
import legacy from '@vitejs/plugin-legacy';
import env from 'vite-plugin-env-compatible';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: { charset: false },
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
        charset: false,
      },
    },
  },
  plugins: [
    vue2(),
    vue2ScriptSetup({
      reactivityTransform: true,
    }),
    pages({
      exclude: [
        '**/components/*.js',
        '**/components/*.jsx',
        '**/components/*.ts',
        '**/components/*.tsx',
        '**/components/*.vue',
      ],
    }),
    layouts(),
    vueComponents({
      resolvers: [iconsResolver()],
    }),
    icons({
      compiler: 'vue2',
      defaultClass: 'el-icon-',
    }),
    legacy({
      targets: [
        'defaults',
        'chrome >= 49',
        'firefox >= 54',
        'safari >= 8',
        'ie >= 11',
        'edge >= 13',
        'android >= 5',
        'ios >= 8',
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    env({
      prefix: 'VITE',
    }),
    eslint({
      fix: true,
    }),
    stylelint({
      fix: true,
    }),
    compression(),
    // mkcert({
    //   autoUpgrade: true,
    //   source: 'coding',
    // }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
    },
  },
  server: {
    // https: {
    //   // https://github.com/vitejs/vite/issues/4403
    //   // @ts-ignore
    //   maxSessionMemory: 128,
    // },
  },
});
