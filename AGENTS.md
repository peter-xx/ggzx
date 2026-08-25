# AGENT.md

面向 AI 编码助手和开发者的项目操作指南。

## 项目概述

`ggzx` 是一个基于 Vue 3 + TypeScript 的管理后台前端项目（硅谷甄选运营平台），使用 Vite 作为构建工具，采用 `<script setup>` 单文件组件（SFC）写法，集成了 Element Plus 组件库、Axios 请求封装、本地 Mock 与 SVG 图标体系。

## 技术栈

| 类别     | 技术                      | 版本                       |
| -------- | ------------------------- | -------------------------- |
| 框架     | Vue                       | ^3.5.40                    |
| 语言     | TypeScript                | ~6.0.2                     |
| 构建     | Vite                      | ^8.2.0                     |
| UI 组件  | Element Plus              | ^2.14.3                    |
| 请求     | Axios                     | ^1.19.0                    |
| Mock     | vite-plugin-mock + mockjs | ^3.0.2 / ^1.1.0            |
| 图标     | vite-plugin-svg-icons     | ^2.0.1                     |
| 样式     | Sass (scss)               | ^1.102.0                   |
| 包管理   | pnpm                      | 11.x（allowBuilds 白名单） |
| 代码检查 | ESLint                    | ^10.8.0（flat config）     |
| 样式检查 | Stylelint                 | ^17.14.1                   |
| 格式化   | Prettier                  | ^3.9.6                     |
| 提交规范 | Commitlint + Husky        | ^21 / ^9                   |

## 常用命令

```bash
pnpm install        # 安装依赖（preinstall 脚本会检查包管理器）
pnpm dev            # 启动开发服务器（自动打开浏览器，启用本地 mock）
pnpm build          # 类型检查 + 生产构建
pnpm build:test     # 以 test 模式构建（加载 .env.test）
pnpm build:pro      # 以 production 模式构建（加载 .env.production）
pnpm preview        # 预览生产构建产物
pnpm lint           # ESLint 检查 src
pnpm fix            # ESLint 自动修复 src
pnpm format         # Prettier 格式化全项目
pnpm lint:style     # Stylelint 检查样式
```

## 项目结构

```
├── src/
│   ├── api/               # 接口定义（按模块分目录，如 user/）
│   ├── assets/
│   │   └── icons/         # SVG 图标源文件（svg-icons 插件读取）
│   ├── components/
│   │   ├── SvgIcon/       # SVG 图标封装组件
│   │   └── index.ts       # 全局组件注册入口
│   ├── styles/
│   │   ├── index.scss     # 全局样式入口（@use reset）
│   │   ├── reset.scss     # 样式重置
│   │   └── variable.scss  # SCSS 变量（vite additionalData 自动注入）
│   ├── utils/
│   │   └── request.ts     # Axios 实例封装（拦截器、错误提示）
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   └── vite-env.d.ts      # 环境类型声明（含 svg-icons 虚拟模块）
├── mock/
│   └── user.ts            # 本地 Mock 接口（vite-plugin-mock）
├── public/                # 公共静态资源
├── scripts/               # 脚本（preinstall 包管理器检查）
├── .husky/                # Git 钩子
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .env.test              # 测试模式变量
├── eslint.config.js       # ESLint flat config
├── .stylelintrc.cjs       # Stylelint 配置
├── .prettierrc.json       # Prettier 配置（无分号、单引号等）
└── commitlint.config.cjs  # 提交信息校验规则
```

## 接口与 Mock

- Axios 实例 baseURL 取自 `VITE_APP_BASE_API`（开发环境 `/dev-api`）
- **Mock url 必须与「baseURL + 接口路径」拼接后的完整路径一致**（如 `/dev-api/admin/acl/index/login`），vite-plugin-mock 按完整请求路径匹配
- Mock 仅在 `vite dev` 时启用（`enable: command === 'serve'`）
- `vite.config.ts` 中已配置 `/dev-api` 代理（开发时被 bypass 跳过以放行 mock）；接入真实后端时，将 `viteMockServe` 的 `enable` 改为 `false` 即可让代理生效
- 响应数据结构约定：`{ code, message, ok, data }`（见 `src/api/user/type.ts` 的 `ResponseData`）

## 环境变量

| 变量                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `VITE_APP_TITLE`    | 应用标题                                 |
| `VITE_APP_BASE_API` | 接口基础路径（dev/test/prod 各环境不同） |

> 注意：.env 文件中不要设置 `NODE_ENV`（Vite 会忽略，由 mode 决定）。

## 代码规范

### ESLint（eslint.config.js，flat config）

- 基础规则：`eslint:recommended` + TypeScript 推荐 + Vue3 essential，另以 `eslint-config-prettier` 关闭与 Prettier 冲突的规则（格式统一由 Prettier 处理）
- 禁止 `var`，禁止未使用变量，`no-console`/`no-debugger` 在生产环境为 error
- 组件命名不强制 `-` 连接（`vue/multi-word-component-names` 已关闭）

### Prettier（.prettierrc.json）

- `semi: false`（不使用分号）、`singleQuote: true`（单引号）
- `trailingComma: "all"`、`tabWidth: 2`、`htmlWhitespaceSensitivity: "ignore"`

### Stylelint（.stylelintrc.cjs）

- 属性书写顺序按 recess-order 规范
- 允许使用 `:deep()`、`:global` 修改组件默认样式
- 忽略 `*.js/ts/json/md` 等非样式文件

### SCSS 约定

- Vite 通过 `additionalData` 自动注入 `@use "@/styles/variable"`，组件内可直接使用其中的变量，无需手动引入
- 局部文件引入遵循 `@use` 语法（不带 `.scss` 扩展名），避免 `@import`（已废弃）

## 分支与开发流程（Git Flow）

本仓库统一采用 Git Flow 工作流，所有开发必须遵循以下分支规则与流程。

### 分支结构

| 分支类型 | 命名规则    | 生命周期 | 说明                                            |
| -------- | ----------- | -------- | ----------------------------------------------- |
| 主分支   | `main`      | 长期     | 仅存放可发布的正式版本，禁止直接开发与推送      |
| 集成分支 | `develop`   | 长期     | 日常开发集成分支，feature 合并目的地            |
| 功能分支 | `feature/*` | 临时     | 新功能开发，从 develop 拉取，完成后删除         |
| 发版分支 | `release/*` | 临时     | 发版前准备（修 bug、改版本号），从 develop 拉取 |
| 修复分支 | `hotfix/*`  | 临时     | 生产环境紧急修复，从 main 拉取                  |

### 日常开发流程（feature）

```bash
git checkout develop && git pull          # 1. 同步最新 develop

git checkout -b feature/xxx develop       # 2. 从 develop 拉功能分支
# ... 开发、本地自测（pnpm lint） ...

git add <文件>
git commit -m "feat: ..."                 # 3. 提交（husky 自动检查 lint/commitlint）

git checkout develop && git pull          # 4. 同步 develop（有冲突先解决）
git checkout feature/xxx
git merge develop

git push -u origin feature/xxx            # 5. 推送功能分支
# 6. GitHub 创建 PR：base=develop，compare=feature/xxx
# 7. Code Review 通过后合并到 develop，删除 feature 分支
```

### 发版流程（release）

```bash
git checkout -b release/x.y.z develop     # 1. 从 develop 拉发版分支
# 2. 仅做 bug 修复与版本号更新，不开发新功能
# 3. 测试通过后：
git checkout main && git merge --no-ff release/x.y.z   # 合入 main
git tag -a vx.y.z -m "vx.y.z" && git push origin --tags  # 打 tag
git checkout develop && git merge --no-ff release/x.y.z  # 同步回 develop
git push origin --delete release/x.y.z   # 删除发版分支
```

### 紧急修复流程（hotfix）

```bash
git checkout -b hotfix/xxx main           # 1. 从 main 拉修复分支
# 2. 修复并提交（type 用 fix）
# 3. 合入 main 并打 tag 发布
git checkout main && git merge --no-ff hotfix/xxx
git checkout develop && git merge --no-ff hotfix/xxx  # 同步修复到 develop
```

### 规则要点

- 禁止直接向 `main` / `develop` 提交代码，所有改动必须通过 PR 合入
- 分支命名使用英文 kebab-case，如 `feature/login-page`、`hotfix/token-expire`
- feature 分支只做一次提交无关的独立功能；发版分支只修 bug
- 合并到 main/develop 统一使用 `--no-ff`（保留合并记录）
- PR 标题建议复用提交信息格式（如 `feat: xxx`），便于追溯

## Git 提交规范

### 提交信息格式（Commitlint）

```
<type>(<scope>): <subject>
```

允许的 type：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `revert` `build`

### 提交前钩子（Husky）

- `pre-commit`：lint-staged 对暂存文件执行 `eslint --fix` 和 `prettier --write`（含 css/scss），需确保暂存区文件通过检查
- `commit-msg`：commitlint 校验提交信息格式

> 提示：Windows 下 PowerShell 执行 husky 钩子可能受限，如遇问题请用 Git Bash 全路径运行相关命令。

## 约定与注意点

- 使用 pnpm 作为包管理器（preinstall 脚本强制校验），不要使用 npm/yarn；pnpm 11 下依赖的 postinstall 需在 `pnpm-workspace.yaml` 的 `allowBuilds` 白名单中声明
- 依赖安装后 husky 通过 `prepare` 脚本自动安装钩子
- 修改配置文件（eslint/stylelint/commitlint）后需自测对应 lint 命令
- 新建组件使用 `<script setup lang="ts">` 写法，接口类型命名使用 PascalCase

## 版本约束与坑位（迁移自 Qoder 项目记忆）

- **vue-tsc 固定 `~2.1.10`**（TS `~6.0.2`）：vue-tsc 3.x 有模板 ref 关联回归（误报 TS6133 unused）；且 2.1.10 + TS 6.0.3 下同一 SFC 同时写普通 `<script>` 与 `<script setup>` 会误报 TS1128。**新组件一律只用一个 `<script setup lang="ts">`，组件名用 `defineOptions({ name: 'xxx' })`**
- **Sass additionalData**：`vite.config.ts` 中必须写 `@use "@/styles/variable" as *`（带 `as *`，否则组件里直接写 `$xxx` 报 Undefined variable）
- **TypeScript 6**：`baseUrl` 已废弃，`paths` 值必须带 `./` 前缀（如 `"@/*": ["./src/*"]`）；solution-style 下子配置（tsconfig.app.json）需自行声明 paths；`erasableSyntaxOnly` 下禁用 `enum`，用 `const 对象 + as const` 替代
- **PowerShell 执行策略**：npm/pnpm/npx 报 PSSecurityException 时执行 `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force`；应急可用 node 直接调模块（如 `node node_modules/stylelint/bin/stylelint.mjs`）；`curl` 是 Invoke-WebRequest 别名，走代理请用 `curl.exe -x`
- **vue-router（hash 模式）**：手输地址必须包含 `#/`；根路径已 redirect 到 `/home`
- **husky**：Windows PowerShell 下直接测试钩子用 Git Bash 全路径：`& "C:\Program Files\Git\bin\bash.exe" .husky/pre-commit`
- 更多历史经验（含各任务解决过程）归档于 `~/.dsh/memory/qoder-memories/d-codebase-ggzx/`

---

## AI 记忆归档（迁移自 Qoder CN，2026-08-18）

本项目的 AI 积累记忆（技术栈、踩坑经验、任务总结等）已从 Qoder CN 导出，存放于本项目 `.ai-memories/` 目录（按主题分类的 Markdown，工具无关，可供 Claude Code / Cursor 等直接查阅）。

- 集中备份：`~/.dsh/memory/qoder-memories/d-codebase-ggzx/`
