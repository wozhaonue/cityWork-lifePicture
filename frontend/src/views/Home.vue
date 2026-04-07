<script setup lang="ts">
import { ref } from 'vue'
import request from '../utils/request'
import { useUserStore } from '@/store/modules/user'
import { useSpaceStore } from '@/store/modules/space'
import { usePictureStore } from '@/store/modules/picture'

// 仅用于触发 Pinia 的开发者工具显示 (Pinia 是懒加载的，只有在组件中被使用时才会在 DevTools 中注册)
const userStore = useUserStore()
const spaceStore = useSpaceStore()
const pictureStore = usePictureStore()

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
    <div class="bg-white p-10 rounded-xl shadow-sm border border-earth-secondary/20 text-center max-w-lg">
      <h1 class="text-3xl font-bold text-premium-gray mb-4 font-serif tracking-wide">
        CityWork 影像资产
      </h1>
      <p class="text-earth-primary mb-8 font-serif italic">
        插件化 Axios 架构验证 (Step 1.4)
      </p>
      
      <div class="flex flex-col gap-4">
        <!-- 按钮用于触发测试 -->
        <el-button type="primary" size="large" @click="testDedupe">
          验证防抖与去重 (发送3次，控制台查看)
        </el-button>
        <el-button type="warning" size="large" @click="testRetry">
          验证超时与重试 (强制超时并重试3次)
        </el-button>
      </div>
    </div>
  </div>
</template>
