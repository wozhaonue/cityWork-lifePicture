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
    <div class="mb-10 flex justify-between items-end border-b border-gray-900 pb-4">
      <div>
        <h1 class="text-4xl font-serif text-gray-900 tracking-wide mb-2">管理中枢</h1>
        <p class="text-gray-500 font-light">全平台数据看板与内容审核流</p>
      </div>
      <div class="text-right text-xs font-mono text-gray-400 tracking-widest uppercase">
        <p>SYSTEM DASHBOARD</p>
        <p class="mt-1">ADMINISTRATOR ONLY</p>
      </div>
    </div>

    <!-- 骨架屏占位与内容区域 -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <!-- 顶部分析大盘骨架 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div class="col-span-2 bg-gray-50 p-8 rounded-xl!">
            <el-skeleton-item variant="text" class="w-1/3 h-6 mb-6" />
            <el-skeleton-item variant="image" class="w-full h-64 rounded-xl!" />
          </div>
          <div class="bg-gray-50 p-8 rounded-xl! flex flex-col justify-center items-center">
            <el-skeleton-item variant="circle" class="w-48 h-48 mb-6" />
            <el-skeleton-item variant="text" class="w-1/2 h-4" />
          </div>
        </div>

        <!-- 底部待审核列表骨架 -->
        <div>
          <el-skeleton-item variant="text" class="w-40 h-8 mb-6" />
          <div class="flex flex-col gap-4">
            <div v-for="i in 3" :key="i" class="flex gap-6 items-center border-b border-dashed border-gray-200 pb-4">
              <el-skeleton-item variant="image" class="w-24 h-24 rounded-lg!" />
              <div class="flex-1 flex flex-col gap-2">
                <el-skeleton-item variant="text" class="w-1/3" />
                <el-skeleton-item variant="text" class="w-1/2" />
              </div>
              <div class="flex gap-2">
                <el-skeleton-item variant="button" class="w-16 h-8" />
                <el-skeleton-item variant="button" class="w-16 h-8" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #default>
        <!-- 实际分析大盘占位 (无边框极简风格) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div class="col-span-2">
            <h2 class="text-xl font-serif text-gray-800 mb-6">热门城市分布</h2>
            <div class="w-full h-64 bg-gray-50/50 flex items-center justify-center relative">
              <div class="absolute bottom-0 w-full flex items-end justify-around px-8 h-48 opacity-20">
                <div class="w-8 bg-gray-400 h-full"></div>
                <div class="w-8 bg-gray-400 h-2/3"></div>
                <div class="w-8 bg-gray-400 h-3/4"></div>
                <div class="w-8 bg-gray-400 h-1/3"></div>
                <div class="w-8 bg-gray-400 h-1/2"></div>
              </div>
              <span class="text-gray-400 font-light tracking-widest text-sm z-10">ECHARTS BAR PLACEHOLDER</span>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-serif text-gray-800 mb-6">存储容量占比</h2>
            <div class="w-full h-64 bg-gray-50/50 flex items-center justify-center relative">
              <div class="w-48 h-48 rounded-full border-[16px] border-gray-200 border-t-gray-400 border-l-gray-300 opacity-20"></div>
              <span class="text-gray-400 font-light tracking-widest text-sm absolute">PIE CHART</span>
            </div>
          </div>
        </div>

        <!-- 实际待审核列表占位 (杂志虚线风格) -->
        <div>
          <h2 class="text-2xl font-serif text-gray-900 mb-8">待审核图库</h2>
          <div class="flex flex-col">
            <div v-for="i in 3" :key="i" class="flex gap-6 items-center border-b border-dashed border-gray-300 pb-6 mb-6 last:border-b-0 group">
              <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <span class="text-xs text-gray-400 font-light">IMG</span>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-serif text-gray-800 mb-1">未命名资产 #00{{ i }}</h3>
                <p class="text-sm text-gray-500 font-light">上传者：System User · 2 小时前</p>
                <div class="mt-2 flex gap-2">
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-sm">城市：上海</span>
                  <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-sm">分类：建筑</span>
                </div>
              </div>
              <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <el-button type="success" plain size="small" class="rounded-none! font-serif tracking-widest">通过</el-button>
                <el-button type="danger" plain size="small" class="rounded-none! font-serif tracking-widest">驳回</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
</style>
