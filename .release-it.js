/* eslint-disable no-template-curly-in-string */
module.exports = {
  git: {
    commitMessage: 'chore(release): v${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
  gitlab: {
    release: false,
  },
  hooks: {
    'before:init': 'pnpm install && pnpm run lint',
    'after:bump': 'pnpm run build',
  },
};
/* eslint-enable no-template-curly-in-string */
