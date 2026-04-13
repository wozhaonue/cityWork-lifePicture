<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <div class="relative w-full h-screen bg-digital-bg overflow-hidden">
    <!-- 顶部标题栏悬浮 (绝对定位) -->
    <div class="absolute top-10 left-10 z-10 pointer-events-none">
      <h1 class="text-5xl font-serif text-gray-900 tracking-wider mix-blend-multiply opacity-80">Public Gallery</h1>
      <p class="text-gray-500 font-light mt-2 tracking-widest uppercase text-sm">3D MAP & EXPLORATION</p>
    </div>

    <!-- 骨架屏占位与内容区域 -->
    <el-skeleton :loading="loading" animated class="w-full h-full">
      <template #template>
        <!-- 模拟 3D 地图加载时的骨架网格 (居中占位) -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-2/3 h-2/3 max-w-4xl relative">
            <el-skeleton-item variant="image" class="absolute inset-0 rounded-[40px] opacity-20" />
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <el-skeleton-item variant="circle" class="w-20 h-20" />
              <el-skeleton-item variant="text" class="w-40 h-4" />
            </div>
          </div>
        </div>
        
        <!-- 侧边影像画报层占位 (固定在右侧) -->
        <div class="absolute right-10 top-1/4 w-80 flex flex-col gap-8 pointer-events-none opacity-50">
          <el-skeleton-item variant="image" class="w-full aspect-[3/4] rounded-xl shadow-lg" />
          <el-skeleton-item variant="image" class="w-full aspect-square rounded-xl shadow-lg -translate-x-10" />
        </div>
      </template>

      <template #default>
        <!-- 实际 3D 地图容器占位 -->
        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-earth-primary/5 to-transparent">
          <div class="text-center">
            <div class="w-32 h-32 mx-auto rounded-full border border-gray-200 border-dashed animate-spin-slow flex items-center justify-center relative mb-6">
              <div class="w-16 h-16 bg-gray-100 rounded-full blur-md"></div>
            </div>
            <p class="text-gray-400 font-light tracking-widest text-sm uppercase">ECharts-GL 3D MAP RESERVED</p>
            <p class="text-gray-300 font-serif text-xs mt-2">地图底座初始化点位</p>
          </div>
        </div>

        <!-- 侧边真实画报层占位 -->
        <div class="absolute right-10 top-1/4 w-80 flex flex-col gap-8 pointer-events-none">
          <div class="w-full aspect-[3/4] rounded-xl shadow-2xl border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden">
            <span class="text-gray-600 font-serif rotate-90 opacity-30">SCROLL-TELLING</span>
          </div>
          <div class="w-full aspect-square rounded-xl shadow-2xl border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center -translate-x-10">
            <span class="text-gray-600 font-serif opacity-30">IMAGE</span>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 15s linear infinite;
}
</style>
