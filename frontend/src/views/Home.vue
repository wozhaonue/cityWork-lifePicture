<script setup lang="ts">
import { ref } from 'vue'
import request from '../utils/request'
import { useUserStore } from '@/store/modules/user'
import { useSpaceStore } from '@/store/modules/space'
import { usePictureStore } from '@/store/modules/picture'
import { CITY_LIST } from '@/constant/city'
import { TEAM_STORY_LIST } from '@/constant/team-story'

// 生成 50 张测试图片数据 (为了验证懒加载)
// 第 5 张 (索引 4) 为错误地址，用于验证重试和兜底机制
const lazyImages = ref(
  Array.from({ length: 50 }).map((_, index) => {
    if (index === 4) {
      return 'https://this-is-an-invalid-image-url.com/error-image.jpg'
    }
    return `https://picsum.photos/seed/${index + 1}/300/200`
  })
)

// 仅用于触发 Pinia 的开发者工具显示 (Pinia 是懒加载的，只有在组件中被使用时才会在 DevTools 中注册)
const userStore = useUserStore()
const spaceStore = useSpaceStore()
const pictureStore = usePictureStore()

// --- 验证 Step 2.3：团队故事静态数据 ---
console.log('--- 触发团队故事 Mock 数据验证 ---')
console.table(TEAM_STORY_LIST)

// Element Plus 自动按需引入，无需手动导入 ElButton

// --- 验证 1：请求防抖与去重 ---
const testDedupe = () => {
  console.log('--- 触发请求防抖与去重测试 ---')
  // 连续发起 3 次相同的请求
  for (let i = 0; i < 3; i++) {
    request.get('https://httpbin.org/delay/1').then(res => {
      console.log(`第 ${i + 1} 次请求成功:`, res)
    }).catch(err => {
      console.log(`第 ${i + 1} 次请求被拦截/取消:`, err.message)
    })
  }
}

// --- 验证 2：请求超时与自动重试 ---
const testRetry = () => {
  console.log('--- 触发请求超时与重试测试 ---')
  // 发起一个必定超时的请求。因为设置了 baseURL，我们可以重写完整的 URL 以测试超时
  // 为了确保超时，使用一个黑洞 IP，或者配置极短的 timeout。由于全局 timeout 为 3000，
  // 我们使用极短的 timeout: 10 来强制超时。
  request.get('https://httpbin.org/delay/2', { timeout: 10 }).then(res => {
    console.log('超时重试测试成功（意料外）:', res)
  }).catch(err => {
    console.log('超时重试测试最终失败:', err.message)
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-digital-bg p-8">
    <div class="bg-white p-10 rounded-xl shadow-sm border border-earth-secondary/20 text-center max-w-lg mb-8">
      <h1 class="text-3xl font-bold text-premium-gray mb-4 font-serif tracking-wide">
        CityWork 影像资产
      </h1>
      <p class="text-earth-primary mb-8 font-serif italic">
        基础架构验证页
      </p>

      <div class="mb-6 p-4 bg-digital-bg rounded-lg border border-earth-secondary/20 flex gap-4 justify-center">
        <el-button type="primary" @click="$router.push('/user/login')">前往登录页 (Step 3.1)</el-button>
        <el-button @click="$router.push('/user/register')">前往注册页 (Step 3.1)</el-button>
      </div>

      <!-- 验证 Step 2.2：全局城市静态数据 -->
      <div class="mb-6 p-4 bg-digital-bg rounded-lg border border-earth-secondary/20">
        <h2 class="text-lg font-bold text-premium-gray mb-2 font-serif">Step 2.2 验证 (静态数据)</h2>
        <p class="text-earth-primary text-sm">
          全局城市数据已加载，当前地级市常量数组长度为：<span class="text-blue-600 font-bold text-base">{{ CITY_LIST.length }}</span>
        </p>
      </div>

      <!-- 验证 Step 2.4：全局图片懒加载 -->
      <div class="mb-6 p-4 bg-digital-bg rounded-lg border border-earth-secondary/20">
        <h2 class="text-lg font-bold text-premium-gray mb-2 font-serif">Step 2.4 验证 (图片懒加载)</h2>
        <p class="text-earth-primary text-sm">
          向下滚动查看效果。第 5 张图片将模拟加载失败，重试 3 次后显示 SVG 兜底图。
        </p>
      </div>
      
      <!-- 渲染 50 张测试图片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div 
          v-for="(imgSrc, index) in lazyImages" 
          :key="index" 
          class="aspect-[3/2] bg-gray-100 rounded overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative"
        >
          <span class="absolute text-gray-400 text-xs top-2 left-2 z-10 bg-white/80 px-2 py-1 rounded">#{{ index + 1 }}</span>
          <img 
            v-image-pro="imgSrc" 
            class="w-full h-full object-cover transition-opacity duration-300" 
            :alt="`测试图片 ${index + 1}`" 
          />
        </div>
      </div>

    </div>
  </div>
</template>
