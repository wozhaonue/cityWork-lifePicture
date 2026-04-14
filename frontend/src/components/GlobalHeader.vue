<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const handleLogout = () => {
  // 退出登录逻辑，这里先清空 store 并跳登录
  userStore.setUserInfo(null)
  router.push('/user/login')
}
</script>

<template>
  <header class="h-20 flex items-center justify-between px-10 shrink-0 z-10">
    <!-- Logo 区域 -->
    <div class="flex items-center gap-4 cursor-pointer" @click="router.push('/')">
      <span class="text-2xl font-bold tracking-widest text-[#2c2c2c] uppercase" style="letter-spacing: 0.2em">CityWork</span>
      <div class="w-px h-4 bg-gray-300"></div>
      <span class="text-sm text-gray-500 font-light italic">Workspace</span>
    </div>

    <!-- 右侧操作区 -->
    <div class="flex items-center gap-8">
      <button class="text-gray-400 hover:text-gray-900 transition-colors" title="搜索">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
      <button class="relative text-gray-400 hover:text-gray-900 transition-colors" title="通知">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <span class="absolute top-0 right-0 block w-1.5 h-1.5 rounded-full bg-[#2c2c2c]"></span>
      </button>

      <template v-if="userInfo">
        <el-dropdown trigger="click">
          <div class="w-8 h-8 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer editorial-border outline-none">
            <img :src="userInfo.userAvatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" class="w-full h-full object-cover" alt="avatar" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/space/personal')">个人空间</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <div class="flex gap-4">
          <button class="text-sm text-gray-500 hover:text-gray-900 transition-colors" @click="router.push('/user/login')">登录</button>
          <button class="text-sm text-gray-500 hover:text-gray-900 transition-colors" @click="router.push('/user/register')">注册</button>
        </div>
      </template>
    </div>
  </header>
</template>

<style scoped>
.editorial-border {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
