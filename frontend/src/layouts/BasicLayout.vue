<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 原始菜单配置 (UI 配置)
const menuConfigs = [
  {
    path: '/space/personal',
    name: '画册管理',
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    path: '/gallery/public',
    name: '城市档案',
    iconPath: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
  },
  {
    path: '/space/team',
    name: '协作团队',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    path: '/admin',
    name: '管理中枢',
    // Settings icon
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }
]

// 动态计算菜单：基于 vue-router 路由表的 meta 信息过滤
const navLinks = computed(() => {
  const routes = router.getRoutes()
  const userRole = userStore.userInfo?.userRole || 'user'
  
  return menuConfigs.filter(menu => {
    // 找到对应的路由对象
    const matchedRoute = routes.find(r => r.path === menu.path)
    if (matchedRoute) {
      // 检查路由是否需要管理员权限
      const requiresAdmin = matchedRoute.meta?.requiresAdmin
      if (requiresAdmin && userRole !== 'admin') {
        return false // 不是管理员则不显示
      }
    }
    return true
  })
})
</script>

<template>
  <div id="basic-layout" class="h-screen overflow-hidden flex flex-col bg-[#fcfbf9] text-[#2c2c2c] font-sans selection:bg-gray-900 selection:text-white">
    <!-- 顶部导航栏 -->
    <GlobalHeader />

    <!-- 下方内容区域 -->
    <div class="flex flex-1 overflow-hidden px-4 pb-4">
      
      <!-- 左侧边栏 (极简无背景框) -->
      <!-- 使用 group 和 hover 状态来控制侧边栏的伸缩，保持极简体验 -->
      <aside class="w-16 hover:w-56 sidebar-transition flex flex-col shrink-0 relative group overflow-hidden pl-4">
        <nav class="space-y-6 mt-8 flex-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-6 transition-colors group/item relative"
            :class="route.path === link.path ? 'text-[#2c2c2c]' : 'text-gray-400 hover:text-[#2c2c2c]'"
          >
            <svg class="w-5 h-5 shrink-0 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.iconPath" />
              <!-- 齿轮中心的圆 -->
              <path v-if="link.name === '管理中枢'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {{ link.name }}
            </span>
            <span v-if="route.path === link.path" class="absolute left-2.5 top-0 w-1.5 h-1.5 bg-[#2c2c2c] rounded-full"></span>
          </router-link>
        </nav>

        <div class="mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <div class="text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-2">Storage</div>
          <div class="text-sm font-light text-[#2c2c2c]">15.2 GB / 20 GB</div>
        </div>
      </aside>

      <!-- 主体内容区，使用 flex-1 撑满剩余高度 -->
      <main class="flex-1 overflow-y-auto bg-white rounded-2xl editorial-border relative shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
        <!-- 为了更好的沉浸感，页面内的滚动交由内部视图控制，或者在这里进行统一的外边距 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* 避免 scoped，这样滚动条样式能作用到全局 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&display=swap");

#basic-layout {
  font-family: "Noto Serif SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 自定义滚动条，极细，低调 */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>

<style scoped>
/* 细边框 */
.editorial-border {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

/* 侧边栏平滑伸缩过渡 */
.sidebar-transition {
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 页面切换的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
