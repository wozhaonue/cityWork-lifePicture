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
  <div class="p-6 md:p-10 max-w-7xl mx-auto w-full">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-serif text-gray-900 tracking-wide mb-2">团队协作空间</h1>
        <p class="text-gray-500 font-light">与你的团队共同沉淀影像资产，共享暗房画布</p>
      </div>
      <el-button type="primary" class="rounded-xl! shadow-sm hover:shadow-md px-6!" plain>
        + 邀请成员
      </el-button>
    </div>

    <!-- 骨架屏占位与内容区域 -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <!-- 团队成员信息卡片骨架 -->
        <div class="mb-12 border-b border-gray-100 pb-8">
          <div class="flex gap-4">
            <el-skeleton-item variant="circle" class="w-12 h-12 shrink-0" />
            <div class="flex flex-col justify-center gap-2 flex-1">
              <el-skeleton-item variant="text" class="w-32" />
              <el-skeleton-item variant="text" class="w-20" />
            </div>
            <el-skeleton-item variant="circle" class="w-12 h-12 shrink-0" />
            <el-skeleton-item variant="circle" class="w-12 h-12 shrink-0" />
          </div>
        </div>

        <!-- 团队相册骨架 (瀑布流模拟) -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <div v-for="i in 6" :key="i" class="break-inside-avoid">
            <el-skeleton-item variant="image" class="w-full rounded-2xl!" :style="{ height: `${200 + Math.random() * 200}px` }" />
          </div>
        </div>
      </template>

      <template #default>
        <!-- 实际成员列表占位 -->
        <div class="mb-12 border-b border-gray-100 pb-8 flex items-center gap-4 overflow-x-auto">
          <div class="w-12 h-12 rounded-full bg-earth-primary/20 flex items-center justify-center shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100">
            <span class="text-earth-primary font-serif font-medium">A</span>
          </div>
          <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100 -ml-2">
            <span class="text-gray-500 font-serif font-medium">B</span>
          </div>
          <div class="ml-4 text-sm text-gray-400 font-light">共 5 位成员</div>
        </div>

        <!-- 实际团队图库瀑布流占位 -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <div v-for="i in 6" :key="i" class="break-inside-avoid relative group overflow-hidden rounded-2xl border border-gray-100 shadow-sm" :style="{ height: `${200 + Math.random() * 200}px` }">
            <div class="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <span class="text-gray-300 font-light text-sm">协作资产 {{ i }}</span>
            </div>
            <!-- 悬浮蒙层 -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
</style>
