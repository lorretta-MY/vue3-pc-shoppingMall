<script setup>
import LayoutFixedHeader from './components/LayoutFixedHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

import { onMounted } from 'vue'

// 获取pinia里的导航数据
import { useCategoryStore } from '@/stores/layoutStore.js'
const CategoryStore = useCategoryStore()

onMounted(() => {
  CategoryStore.getCategory()
})
</script>
<template>
  <div>
    <!-- 首页header 登录 -->
    <LayoutNav />

    <!-- 一级分类 吸顶导航 -->
    <LayoutFixedHeader />

    <!-- 一级分类 导航 -->
    <LayoutHeader />

    <!-- 二级页面路由 -->
    <!-- 添加KEY，让其强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <!-- 更新后 -->
    <RouterView />

    <!-- 首页footer -->
    <LayoutFooter />
  </div>
</template>
