<script setup lang="ts">
import { onMounted } from 'vue'
import request from './utils/request'

// Element Plus 自动按需引入，无需手动导入 ElButton

// 步骤 1.4 验证：发起一个会明确返回 404 状态码的外部接口请求，以触发响应拦截器的 reject 链
onMounted(async () => {
  try {
    await request.get('https://httpbin.org/status/404')
  } catch (error) {
    console.log('测试请求拦截到的错误：', error)
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-digital-bg p-8">
    <div class="bg-white p-10 rounded-xl shadow-sm border border-earth-secondary/20 text-center max-w-lg">
      <!-- 测试 Noto Serif SC 衬线字体和自定义颜色 -->
      <h1 class="text-3xl font-bold text-premium-gray mb-4 font-serif tracking-wide">
        CityWork 影像资产
      </h1>
      <p class="text-earth-primary mb-8 font-serif italic">
        “数字胶片”与“现代极简”视觉规范验证
      </p>
      
      <!-- 测试全局 CSS 变量是否成功覆盖了 Element Plus 默认样式 -->
      <el-button 
        type="primary" 
        size="large" 
      >
        Element Plus 全局主题验证
      </el-button>
    </div>
  </div>
</template>
