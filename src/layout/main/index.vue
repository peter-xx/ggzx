<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

let layoutSettingStore = useLayoutSettingStore()

let flag = ref(true)

watch(
  () => layoutSettingStore.refresh,
  () => {
    //点击刷新按钮:路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'LayoutMain',
}
</script>

<style scoped></style>
