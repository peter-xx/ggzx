import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier/flat'
import { defineConfig } from 'eslint/config'

// 对应旧格式 rules 中依赖 process.env.NODE_ENV 的开关
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig([
  {
    // 替代旧 .eslintignore（node_modules 默认已忽略，只需排除构建产物）
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    // 基础配置：对应旧格式的 env + eslint:recommended + 基础规则
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    // 对应 "eslint:recommended"
    extends: ['js/recommended'],
    languageOptions: {
      // 对应 parserOptions.ecmaVersion: "latest"（自动启用 ES2021 全局变量）
      ecmaVersion: 'latest',
      // 对应 parserOptions.sourceType: "module"
      sourceType: 'module',
      // 对应 env: { browser: true, node: true }
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // ---- eslint 基础规则 ----
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': isProd ? 'error' : 'off',
      'no-debugger': isProd ? 'error' : 'off',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符
    },
  },
  // 对应 "plugin:@typescript-eslint/recommended"（自带 tseslint.parser 解析器）
  tseslint.configs.recommended,
  {
    // TypeScript 自定义规则
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      // 注：旧配置的 "prefer-ts-expect-error" 已在 typescript-eslint v8 移除，故未迁移
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TS 模块和命名空间
      '@typescript-eslint/semi': 'off',
    },
  },
  // 对应 "plugin:vue/vue3-essential"（自带 vue-eslint-parser 解析模板）
  pluginVue.configs['flat/essential'],
  {
    // 针对 .vue 文件：顶层 parser 即 vue-eslint-parser，这里配置其解析选项
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // <script> 部分使用 @typescript-eslint/parser
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // 要求组件名称为 "-" 连接的单词
      // 注：旧配置的 "vue/script-setup-uses-vars" 已在 eslint-plugin-vue v10 移除（v9 起该功能已内置），故未迁移
      'vue/no-mutating-props': 'off', // 不允许组件 prop 的改变
      'vue/attribute-hyphenation': 'off', // 强制自定义组件属性命名样式
    },
  },
  // 关闭与 Prettier 冲突的规则，格式统一由 Prettier 处理（lint-staged / format）
  prettierConfig,
])
