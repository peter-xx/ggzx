import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})

export default useLayoutSettingStore
