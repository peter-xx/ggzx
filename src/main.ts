import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import globalComponent from './components/index'
import router from './router'
import pinia from './store/index.ts'
import './permisstion.ts'

const app = createApp(App)
// 全局注册 Element Plus，并指定中文语言包
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
