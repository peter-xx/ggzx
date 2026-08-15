<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-else-if="item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <LayoutMenu :menuList="item.children"></LayoutMenu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'LayoutMenu',
}
</script>

<style scoped></style>
