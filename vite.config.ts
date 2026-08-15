import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 由 .env 中的 VITE_MOCK 控制：'true' 启用 mock，否则关闭走真实后端
        enable: command === 'serve' && env.VITE_MOCK === 'true',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 注入全局变量：as * 使变量无需命名空间即可直接使用；
          // 不带 .scss 扩展名（stylelint scss/load-partial-extension 规则要求）
          additionalData: '@use "@/styles/variable" as *;',
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
        },
      },
    },
  }
})
