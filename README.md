# boilerplate-vue2

## 简介

`boilerplate-vue2` 是一个面向中国用户的简单 `vue` 模板，目标是帮助你快速开发桌面端网页/移动端网页。当然，也希望能引导你更进一步地了解 `vue` 生态。

如果你想要快速开发移动端应用，请考虑加入 `cordova`、`native-script` 或 `capacitor`，或者使用 [boilerplate-uni-app-vue2](https://github.com/MillCloud/boilerplate-uni-app-vue2)。

如果你想要快速开发桌面端应用，请考虑使用 [nativefier](https://github.com/nativefier/nativefier) 或 [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)。

该模板只支持 vue 2。vue 3 支持请查看 [boilerplate-vue3](https://github.com/MillCloud/boilerplate-vue3)（WIP）。

### 主要依赖

- [vue2](https://cn.vuejs.org)
- [vue-cli](https://cli.vuejs.org/zh/)
- [unplugin-icons](https://github.com/antfu/unplugin-icons)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [unplugin-vue2-script-setup](https://github.com/antfu/unplugin-vue2-script-setup)
- [vue-router](https://router.vuejs.org/zh/)
- [vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing)
- [vuex](https://vuex.vuejs.org/zh/)
- [@vue/composition-api](https://github.com/vuejs/composition-api/blob/main/README.zh-CN.md)
- [vue-use](https://vueuse.org)
- [vue-i18n](https://kazupon.github.io/vue-i18n/zh/)
- [typescript](https://www.typescriptlang.org/zh/)
- [mitt](https://github.com/developit/mitt)
- [axios](https://github.com/axios/axios)
- [vue-query](https://vue-query.vercel.app/)
- [statuses](https://github.com/jshttp/statuses)
- [tailwindcss](https://v1.tailwindcss.com/) - 支持了大部分 v2 类值、支持大部分类渐进增强、`0.5` 将会被替换成 `0_5`、`1/2` 将会被替换成 `1-2`，但仍然不要使用高级特性，否则不能支持低端浏览器，具体可以到 [caniuse](https://caniuse.com/) 查询
- [element-ui](https://element.eleme.cn) - 对于移动端网页，请考虑 [vant](https://youzan.github.io/vant)
- [iconify](https://iconify.design/)
- [portal-vue](https://portal-vue.linusb.org/)
- [@sum.cumo/vue-browserupdate](https://browser-update.org/zh/)
- [@modyqyw/utils](https://github.com/modyqyw/utils)
- [immer](https://immerjs.github.io/immer/)
- [dayjs](https://dayjs.gitee.io/zh-CN/)
- [nprogress](https://ricostacruz.com/nprogress/)
- [faker](https://github.com/marak/Faker.js/)
- [mock.js](http://mockjs.com/)
- [sass](https://sass-lang.com/) - 使用了 [dart-sass](https://sass-lang.com/dart-sass)，可能会导致图标问题，见 [vue-element-admin issue#3344](https://github.com/PanJiaChen/vue-element-admin/issues/3344)
- [purgecss](https://purgecss.com)
- [@modyqyw/fabric](https://github.com/ModyQyW/fabric)
- [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

请先阅读上面的文档，并确保对 `node` 和 `npm` 有 [基本了解](http://nodejs.cn/learn)。

## 起步

这部分说明将让你得到能在本地运行的项目副本以开始开发。有关如何部署项目，请阅读 [部署部分](#部署)。

### 准备

你可能需要使用梯子或手机 WiFi 完成准备步骤。

对于 macOS 用户，请按照以下指引操作。

```sh
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 设置 nvm 镜像
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
# 安装 node@14
nvm install 14
# 设置 node@14 为默认版本
nvm alias default 14
# 安装 yarn
npm i -g yarn --registry=https://registry.npm.taobao.org
# 安装 homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# 安装 git
brew install git
# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main

```

设置 `~/.huskyrc`。

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

```

对于 Windows 用户，请按照以下指引操作。

首先安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip) 和 [Git](https://git-scm.com/downloads)。

如果你正在使用 [Chocolatey](https://chocolatey.org/) 或 [Scoop](https://scoop.sh/)，你也可以通过命令安装，然后配置。

```sh
# 使用 Chocolatey
choco install nvm
choco install git

# 使用 Scoop
scoop install nvm
scoop install git

# 不自动转换换行符
git config --global core.autocrlf false
# 设置默认分支名为 main
git config --global init.defaultBranch main
# 设置 nvm 镜像
nvm node_mirror https://npm.taobao.org/mirrors/node/
# 安装 node@14
nvm install 14.17.6
# 使用 node@14
nvm use 14.17.6
# 安装 yarn
npm i -g yarn --registry=https://registry.npm.taobao.org

```

其它系统请根据以上指引自行调整。

### 安装

```sh
# clone 项目到本地
git clone git@github.com:MillCloud/boilerplate-vue2.git
# git clone git@gitee.com:MillCloud/boilerplate-vue2.git
# 进入项目
cd boilerplate-vue2
# 安装依赖
yarn install
# 启动项目
yarn run dev

```

如果一切正常，此时模板已经启动了，你可以正式开始开发。但如果你想通过文档了解更多，请先阅读 [主要依赖](#主要依赖) 内链接对应的文档，再继续阅读下去。

## 使用

这部分说明力求使你能自顶向下地理解这个模板已经替你完成的工作，以及你需要自行完成的工作。

### 特性

- 多模式配置示例，支持 `development`，`staging` 和 `production`
- 国际化配置示例，支持 `en` 和 `zh-Hans`
- 路由配置示例
- 状态管理配置示例
- 请求配置示例
- 布局示例

### 命令

模板里内置了较多命令，以适应各种不同的情况。更多的命令你可以查看 [package.json](./package.json)。

|命令|含义|
|-|-|
|`yarn run dev`|`development` 模式启动项目|
|`yarn run staging-build`|`staging` 模式打包项目|
|`yarn run build`|`production` 模式打包项目|
|`yarn run check`|检查项目依赖版本|
|`yarn run commit`|引导填写 git 提交信息并提交，你需要手动 `git add` 对应部分后执行该命令|
|`yarn run i18n:report`|获取国际化信息|
|`yarn run test:unit`|单元测试|
|`yarn run lint`|检查脚本文件，样式文件和 markdown 文件|
|`yarn run lint:eslint`|检查并自动修复脚本文件|
|`yarn run lint:markdownlint`|格式化 markdown 文件|
|`yarn run lint:stylelint`|检查并自动修复样式文件|
|`yarn run release`|发布新版本|

### 项目结构

```sh
.
├── .husky                      # husky 配置目录
├── public
├── src
│   ├── assets                  # 资产目录
│   ├── components              # 全局组件目录
│   ├── composables             # 组合式 API 目录
│   ├── data                    # 固定数据目录
│   ├── i18n                    # 国际化目录
│   ├── layouts                 # 布局目录
│   ├── mocks                   # 接口模拟目录
│   ├── pages                   # 页面视图目录
│   ├── plugins                 # 插件目录
│   ├── router                  # 路由目录
│   ├── store                   # 状态管理目录
│   ├── styles                  # 全局样式和全局变量目录
│   ├── utils                   # 工具方法目录
│   ├── App.vue
│   ├── guard.ts                # 导航守卫
│   ├── main.ts
│   ├── shims-tsx.d.ts
│   └── shims-vue.d.ts
├── .browserslistrc             # 浏览器支持列表文件
├── .commitlintrc.js            # commitlint 配置文件
├── .editorconfig
├── .env                        # 所有环境都载入的环境变量
├── .env.development            # development 载入的环境变量
├── .env.production             # production 载入的环境变量
├── .env.staging                # staging 载入的环境变量
├── .eslintrc.js                # eslint 配置文件
├── .gitattributes              # git 配置文件
├── .gitignore                  # git 配置文件
├── .lintstagedrc.js            # lint-staged 配置文件
├── .markdownlint.json          # markdownlint 配置文件
├── .npmrc                      # npm 配置文件
├── .prettierrc.js              # prettier 配置文件
├── .release-it.js              # release-it 配置文件
├── .stylelintrc.js             # stylelint 配置文件
├── babel.config.js             # babel 配置文件
├── components.d.ts             # 组件定义文件
├── package.json
├── postcss.config.js           # postcss 配置文件
├── README.md
├── tailwind.config.js          # tailwindcss 配置文件
├── tsconfig.json               # typescript 配置文件
├── vue.config.js               # vue-cli 配置文件
└── yarn.lock
```

### 多模式配置

模板内置了四个环境变量文件。

#### .env

所有模式都会载入这个环境变量文件。

它里面包含了两个国际化变量 `VUE_APP_I18N_LOCALE` 和 `VUE_APP_I18N_FALLBACK_LOCALE`，值都是 `zh-Hans`，表示默认使用简体中文。

另外，它还包含了请求变量 `VUE_APP_REQUEST_TIMEOUT`，用于指定请求的超时时间，值为 `10000`，表示 10 秒超时。

#### .env.staging

`staging` 模式下，这个环境变量文件会被载入。

它使用 `VUE_APP_MODE` 指定当前模式为 `staging`，`NODE_ENV` 指定运行模式为 `production`。

请区分当前模式和运行模式。当前模式可以由我们任意指定，而运行模式只能是 `development`，`production` 和 `test` 的其中一个，它会影响实际构建的表现和效果。在代码中，你可以根据实际情况，使用它们对代码做差异化处理。

另外，它还使用 `VUE_APP_PUBLIC_PATH` 指定了项目构建后的 `publicPath` 为 `/`，表示使用根目录。

而 `VUE_APP_REQUEST_BASE_URL` 指定了请求的前缀地址，值为 `https://fake.url`，这是一个假地址，在实际使用时需要修改。

`.env.development`，`.env.production` 都和 `.env.staging` 的内容大同小异，在这里不再赘述。

如果你还需要添加更多的模式，请参考以上的说明添加对应的环境变量文件。另外，还需要修改 `package.json` 内的 `scripts` 字段，以添加对应的构建命令。

### 国际化配置

模板内置了两种语言配置，分别是简体中文和英语。

简体中文文件是 [@/i18n/locales/zh-Hans.json](./src/i18n/locales/zh-Hans.json)，英语文件是 [@/i18n/locales/en.json](./src/i18n/locales/en.json)。

你可以在上面两个文件里加入你需要的字段以支持翻译，务必注意字段需要保持一致，也请注意合理地划分字段。

而要引入和 `vue2` 强绑定的 `npm` 库的语言包，你可以在 [@/i18n/index.js](./src/i18n/index.js) 内操作。目前已经为 `element-ui` 添加了语言包，你可以参考着为其他和 `vue2` 强绑定的 `npm` 库添加语言包。

引入和 `vue2` 不强绑定的 `npm` 库的语言包，请查看它们的文档说明。

### 路由配置

模板使用了 `vue-cli-plugin-auto-routing` 以自动生成基于文件系统的约定式路由，更易于迁移到 `vite` + `vite-plugin-pages` + `vite-plugin-vue-layouts` 的组合。

### 状态管理配置

模板把状态管理分成了两类，一类是应用类状态，一类是业务类状态。

#### 应用类状态

应用类状态是应用本身的状态，包括应用当前语言等。

#### 业务类状态

业务类状态是应用所承载的业务的状态，包括用户信息，页面通用数据等。模板建议把业务类状态分模块放置。

### 请求配置

#### axios 封装

模板提供了基于 axios 和 vue-query 的请求示例，可以查看 [@/utils/request.ts](./src/utils/request.ts)，[@/App.vue](./src/App.vue) 和 [@/pages/index.vue](./src/pages/index.vue)，并根据业务做适当调整。

模板也提供了 `useRequest`，默认加入了一些拦截器和适配器以实现自动日志、自动重试。你可以根据业务适当调整 [封装文件](./src/composables/request.ts)。

你也可以考虑使用 [swrv](https://docs-swrv.netlify.app/)。

#### proxy

在 `development` 运行模式下请求服务器往往会出现跨域问题，因此模板内已经设置了只在 `development` 运行模式下生效的 `devServer.proxy`，见 [vue.config.js](./vue.config.js) L68。

同时，需要设置 `axios` 的 `baseURL` 为空字符串，否则会导致代理失败，见 [@/composables/useAxios.ts](./src/composables/useAxios.ts) L72。

为了向其它 CLI 靠近，你可以调整 `devServer.proxy`，下面是一个示例。

```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_REQUEST_BASE_URL || 'https://fake.url',
        changeOrigin: true,
      },
    },
  },
};

```

一般情况下，`devServer.proxy` 应该与某个 `production` 运行模式下的 `VUE_APP_REQUEST_BASE_URL` 一致。

### 布局

模板内使用了 `element` 提供的 [默认布局](./src/layouts/default.vue)，你可以视需求添加额外的布局并应用。

常见的布局可以参考 [Ant Design](https://ant.design/components/layout-cn/)，[@ant-design/pro-layout](https://procomponents.ant.design/components/layout) 和 [Vuetify](https://vuetifyjs.com/)。

我们会试图让布局适用于所有页面。试想这么一个情况：登录页面只显示 `v-main` 部分，而在其它页面显示所有部分。直接使用默认布局是不能实现的，所以有必要根据不同的路由来调整布局组件，只需要 [获取当前路由信息](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7) 并加以判断即可。

我们也可能根据用户角色生成路由和侧边栏，模板内置的该部分功能较为薄弱，且思路源自 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，请查看 vue-element-admin [路由和侧边栏](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html) 和 [权限验证](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/permission.html) 阐述的思路。

也推荐你学习 [vue-vben-admin](https://github.com/anncwb/vue-vben-admin) 源码。

### VSCode 支持

你可以参考 [插件](https://www.yuque.com/modyqyw/environment/skhbfr) 和 [settings.json](https://www.yuque.com/modyqyw/environment/aozv2q)。

### 部署

- 确认所有和 [模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html) 相关的地方已经配置完成。
- 运行 `yarn run release`，更新版本号。
- 上传 `dist` 目录下的内容。
- 默认会生成报告。
- 更多自定义可以参考 `release-it` 文档说明，使用 `node` 运行脚本完成操作。

### 浏览器支持

请查看 [.browserslistrc](./.browserslistrc)。
