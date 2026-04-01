<script setup lang="ts">
// Element Plus 自动按需引入，无需手动导入 ElButton
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
      
      <!-- 测试 Tailwind 对 Element Plus 的覆盖能力 -->
      <el-button 
        type="primary" 
        size="large" 
        class="!bg-earth-primary !border-earth-primary hover:!bg-earth-secondary transition-colors duration-300"
      >
        Tailwind + Element 按钮验证
      </el-button>
    </div>
  </div>
</template>
