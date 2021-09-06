/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env'),
    process.env.NODE_ENV === 'production' &&
      require('@fullhuman/postcss-purgecss')({
        content: [`./public/**/*.html`, `./src/**/*.vue`],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            '',
          );
          return contentWithoutStyleBlocks.match(/[\w/:-]*[\w/-]+/g) || [];
        },
        safelist: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /^uni-.*/,
          /^cl-.*/,
          /^u-.*/,
          /^tui-.*/,
        ],
      }),
  ],
};
