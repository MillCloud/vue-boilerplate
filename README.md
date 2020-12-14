# boilerplate-vue

---

vue 模板。

## 起步

这些说明将让你得到能在本地启动、运行的项目副本以进行开发和测试。有关如何在实时系统上部署项目，请参阅[部署](#部署)。

## 准备

你可能需要使用梯子或手机 WiFi 完成准备步骤。

- Node 镜像[参考](https://developer.aliyun.com/mirror/NPM)
- Homebrew 镜像[参考](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)

### macOS

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
nvm install 12
nvm alias default 12
npm i -g yarn
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-drivers.git
brew update
brew install git

```

### Windows

先安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip) 和 [Git](https://git-scm.com/downloads)。

```sh
nvm node_mirror https://npm.taobao.org/mirrors/node/
nvm npm_mirror https://npm.taobao.org/mirrors/npm/
nvm install 12.20.0
nvm use 12.20.0
npm i -g yarn

```

### 安装

```sh
# clone
git clone git@github.com:MillCloud/boilerplate-vue.git
# or gitee
# git clone git@github.com:MillCloud/boilerplate-vue.git

# enter the directory
cd boilerplate-vue

# install dependency
yarn

# build for development
yarn dev

# build for staging
yarn staging-build

# build for production
yarn build

# lint scripts, styles and ls
yarn lint

# check deps
yarn run check

# git commit and git push
# git add should be handled by yourself
yarn commit
```

## 测试

目前没有测试。欢迎 PR。

## 部署

- 确认所有和[模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)相关的地方已经配置完成。
- 运行对应的命令，然后上传`dist`目录下的内容，默认会生成报告。

## 主要依赖

- [vue](https://vuejs.org)
- [vue-cli](https://cli.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [vue-composition-api](https://composition-api.vuejs.org/)
- [vue-use](https://vueuse.js.org/)
- [mitt](https://github.com/developit/mitt#readme)
- [vue-i18n](https://kazupon.github.io/vue-i18n/)
- [mitt](https://github.com/developit/mitt#readme)
- [axios](https://github.com/axios/axios#readme)
- [swrv](https://github.com/Kong/swrv#readme)
- [vuetify](https://vuetifyjs.com/)
- [portal-vue](https://portal-vue.linusb.org/)
- [better-scroll](https://better-scroll.github.io/docs/zh-CN/guide/)
- [lodash](https://lodash.com/)
- [xe-utils](https://github.com/x-extends/xe-utils#readme)
- [dayjs](https://day.js.org)
- [nprogress](https://ricostacruz.com/nprogress/)
- [mock.js](http://mockjs.com/)
- [sass](https://sass-lang.com/) - 使用了 [dart-sass](https://sass-lang.com/dart-sass)
- [commitizen](http://commitizen.github.io/cz-cli/)
- [commitlint](https://commitlint.js.org/)
- [prettier](https://prettier.io/)
- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [ls-lint](https://ls-lint.org/)
- [husky](https://github.com/typicode/husky#readme)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [@modyqyw/fabric](https://github.com/MillCloud/fabric#readme)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates#readme)

## 浏览器支持

请查看 [.browserslistrc](./.browserslistrc)。

## 贡献

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解行为准则以及提交拉取请求的流程的详细信息。

## 作者

- **Rui Wu** - *最初工作* - [ModyQyW](https://github.com/ModyQyW)

另请参阅参与此项目的 [contributors](https://github.com/ModyQyW/boilerplate-vue/contributors) 列表。
