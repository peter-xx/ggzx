/// <reference types="vite/client" />

declare module 'virtual:svg-icons-register' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, any>,
    Record<string, any>,
    any
  >
  export default component
}

declare module 'virtual:svg-icons-names' {
  const iconsNames: string[]
  export default iconsNames
}
