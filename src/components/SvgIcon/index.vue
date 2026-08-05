<template>
  <div>
    <svg :style="{ width, height }">
      <use :href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    //use href 属性值的前缀
    prefix?: string
    //svg矢量图的名字（与 src/assets/icons 下文件名对应）
    name: string
    //svg图标的颜色
    color?: string
    //svg宽度
    width?: string
    //svg高度
    height?: string
  }>(),
  {
    prefix: '#icon-',
    color: '',
    width: '16px',
    height: '16px',
  },
)
</script>
