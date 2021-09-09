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
            // eslint-disable-next-line regexp/match-any
            /<style[^]+?<\/style>/gi,
            '',
          );
          // eslint-disable-next-line regexp/optimal-quantifier-concatenation
          return contentWithoutStyleBlocks.match(/[\w/:-]*[\w/-]+/g) || [];
        },
        safelist: [
          // eslint-disable-next-line regexp/no-empty-alternative
          /-(leave|enter|appear)(|-(to|from|active))$/,
          // eslint-disable-next-line regexp/no-empty-alternative
          /^(?!(|.*?:)cursor-move).+-move$/,
          // eslint-disable-next-line regexp/no-empty-alternative
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
/* eslint-enable global-require */
