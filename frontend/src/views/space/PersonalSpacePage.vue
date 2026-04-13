<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  // 模拟数据获取过程
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <div class="p-6 md:p-10 max-w-7xl mx-auto w-full">
    <div class="mb-10">
      <h1 class="text-4xl font-serif text-gray-900 tracking-wide mb-2">个人空间</h1>
      <p class="text-gray-500 font-light">管理你的数字影像资产与城市图集</p>
    </div>

    <!-- 骨架屏占位与内容区域 -->
    <el-skeleton :loading="loading" animated>
      <!-- 加载中：骨架屏布局 -->
      <template #template>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="flex flex-col gap-3">
            <!-- 模拟图片/相框 -->
            <el-skeleton-item variant="image" class="w-full aspect-[4/5] rounded-xl!" />
            <!-- 模拟标题与辅助信息 -->
            <div class="flex items-center justify-between px-1">
              <el-skeleton-item variant="text" class="w-1/2" />
              <el-skeleton-item variant="text" class="w-1/4" />
            </div>
          </div>
        </div>
      </template>

      <!-- 加载完成：实际内容展示 -->
      <template #default>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <!-- 这里是真实数据的占位，后续在步骤 4 开发 -->
          <div v-for="i in 8" :key="i" class="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div class="w-full aspect-[4/5] bg-gray-50 flex items-center justify-center">
              <span class="text-gray-300 font-light text-sm">图片区域</span>
            </div>
            <div class="p-4 flex items-center justify-between">
              <span class="font-serif text-gray-800">城市文件夹 {{ i }}</span>
              <span class="text-xs text-gray-400 font-light">{{ i * 3 }} 张</span>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
</style>
