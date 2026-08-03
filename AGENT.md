# AGENT.md

面向 AI 编码助手和开发者的项目操作指南。

## 项目概述

`ggzx` 是一个基于 Vue 3 + TypeScript 的前端项目，使用 Vite 作为构建工具，采用 `<script setup>` 单文件组件（SFC）写法。

## 技术栈

| 类别     | 技术               | 版本                   |
| -------- | ------------------ | ---------------------- |
| 框架     | Vue                | ^3.5.40                |
| 语言     | TypeScript         | ~6.0.2                 |
| 构建     | Vite               | ^8.2.0                 |
| 包管理   | pnpm               | workspace 模式         |
| 代码检查 | ESLint             | ^10.8.0（flat config） |
| 样式检查 | Stylelint          | ^17.14.1               |
| 格式化   | Prettier           | ^3.9.6                 |
| 提交规范 | Commitlint + Husky | ^21 / ^9               |

## 常用命令

```bash
pnpm install        # 安装依赖（preinstall 脚本会检查包管理器）
pnpm dev            # 启动开发服务器（自动打开浏览器）
pnpm build          # 类型检查 + 生产构建（vue-tsc -b && vite build）
pnpm preview        # 预览生产构建产物
pnpm lint           # ESLint 检查 src
pnpm fix            # ESLint 自动修复 src
pnpm format         # Prettier 格式化全项目
pnpm lint:style     # Stylelint 检查样式
```

## 项目结构

```
├── src/                  # 源码目录
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── App.vue           # 根组件
│   ├── main.ts           # 应用入口
│   └── style.css         # 全局样式
├── public/               # 公共静态资源
├── scripts/              # 脚本（preinstall 包管理器检查）
├── .husky/               # Git 钩子
├── eslint.config.js      # ESLint flat config
├── .stylelintrc.cjs      # Stylelint 配置
├── .prettierrc.json      # Prettier 配置（无分号、单引号）
└── commitlint.config.cjs # 提交信息校验规则
```

## 代码规范

### ESLint（eslint.config.js，flat config）

- 基础规则：`eslint:recommended` + TypeScript 推荐 + Vue3 essential，另以 `eslint-config-prettier` 关闭与 Prettier 冲突的规则（格式统一由 Prettier 处理）
- 禁止 `var`，禁止未使用变量，`no-console`/`no-debugger` 在生产环境为 error
- 组件命名不强制 `-` 连接（`vue/multi-word-component-names` 已关闭）

### Prettier（.prettierrc.json）

- `semi: false`（不使用分号）
- `singleQuote: true`（单引号）

### Stylelint（.stylelintrc.cjs）

- 属性书写顺序按 recess-order 规范
- 允许使用 `:deep()`、`:global` 修改组件默认样式
- 忽略 `*.js/ts/json/md` 等非样式文件

## Git 提交规范

### 提交信息格式（Commitlint）

```
<type>(<scope>): <subject>
```

允许的 type：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `revert` `build`

### 提交前钩子（Husky）

- `pre-commit`：lint-staged 对暂存文件执行 `eslint --fix` 和 `prettier --write`，需确保暂存区文件通过检查
- `commit-msg`：commitlint 校验提交信息格式

> 提示：Windows 下 PowerShell 执行 husky 钩子可能受限，如遇问题请用 Git Bash 全路径运行相关命令。

## 约定与注意点

- 使用 pnpm 作为包管理器（preinstall 脚本强制校验），不要使用 npm/yarn
- 依赖安装后 husky 通过 `prepare` 脚本自动安装钩子
- 修改配置文件（eslint/stylelint/commitlint）后需自测对应 lint 命令
- 新建组件使用 `<script setup lang="ts">` 写法
