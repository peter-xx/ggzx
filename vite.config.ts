import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      enable: command === 'serve',
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
        additionalData: '@use "@/styles/variable";',
      },
    },
  },
  server: {
    // 与真实后端联调时使用：将 /dev-api 前缀请求转发到后端服务
    // 开发环境 mock 生效时通过 bypass 跳过代理，请求走本地 mock；
    // 接入真实后端时，将上方 viteMockServe 的 enable 改为 false 即可让代理生效
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, ''),
        bypass: () => (command === 'serve' ? false : undefined),
      },
    },
  },
}))
