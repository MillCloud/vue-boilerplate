# test-vue

[English](./README.md) | 简体中文

---

用于测试 vue 的仓库。

## 起步

这些说明将让你得到能在本地启动、运行的项目副本以进行开发和测试。有关如何在实时系统上部署项目，请参阅[部署](#部署)。

## 准备

- 推荐使用 nvm，长期支持版 lts node，长期支持版 npm 和 yarn。
  - 参照以下链接，首先安装 nvm
    - [nvm for Mac/Linux](https://github.com/nvm-sh/nvm)
    - [nvm-windows](https://github.com/coreybutler/nvm-windows)
    - 使用 [Homebrew](https://brew.sh/) 在 Mac 安装 nvm 是**不**推荐的
  - 在终端/命令行安装长期支持版 node
  - 全局升级 npm 到长期支持版，安装 yarn

    ```sh
    npm i -g npm@lts
    npm i -g yarn
    ```

  - 默认设置了镜像为国内淘宝源
- Git 也是需要的
  - [git for Windows/Linux](https://git-scm.com/downloads)
  - 使用 [Homebrew](https://brew.sh/) 在 Mac 安装 git 是推荐的

### 安装

```sh
# clone
git clone git@github.com:MillCloud/test-vue.git

# enter the directory
cd test-vue

# install dependency
yarn

# build for development
yarn dev

# build for staging
yarn build:staging

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

- 确认所有和[模式和环境变量]相关的地方已经配置完成。
- `staging`模式下运行`yarn build:staging`，`production`模式下运行`yar build`，然后把`dist`文件夹里的内容放到服务器上。默认会生成报告。

## 主要依赖

- [vue](https://vuejs.org)
- [vue-cli](https://cli.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [vue-composition-api](https://composition-api.vuejs.org/)
- [vue-i18n](https://kazupon.github.io/vue-i18n/)
- [axios](https://github.com/axios/axios#readme)
- [swrv](https://github.com/Kong/swrv#readme)
- [ress](https://ress-css.surge.sh/)
- [element-ui-eoi](https://github.com/ElemeFE/element/pull/19081)
- [nut-ui](https://nutui.jd.com/)
- [tailwindcss](https://tailwindcss.com/)
- [vxe-table](https://github.com/x-extends/vxe-table#readme)
- [vxe-table-plugin-element](https://github.com/x-extends/vxe-table-plugin-element#readme)
- [vue-echarts](https://github.com/ecomfe/vue-echarts#readme)
- [lodash](https://lodash.com/)
- [xe-utils](https://github.com/x-extends/xe-utils#readme)
- [dayjs](https://day.js.org)
- [nprogress](https://ricostacruz.com/nprogress/)
- [vue-clipboard2](https://vue-clipboard2.inndy.tw/)
- [vue-lazyload](https://github.com/hilongjw/vue-lazyload#readme)
- [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list#readme)
- [sass](https://sass-lang.com/) - using [node-sass](https://github.com/sass/node-sass#readme) here
- [commitlint](https://commitlint.js.org/)
- [commitizen](http://commitizen.github.io/cz-cli/)
- [prettier](https://prettier.io/)
- [eslint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [ls-lint](https://ls-lint.org/)
- [husky](https://github.com/typicode/husky#readme)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates#readme)

## 贡献

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解行为准则以及提交拉取请求的流程的详细信息。

## 作者

- **Rui Wu** - *最初工作* - [ModyQyW](https://github.com/ModyQyW)

另请参阅参与此项目的 [contributors](https://github.com/ModyQyW/test-vue/contributors) 列表。
