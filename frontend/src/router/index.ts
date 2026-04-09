import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // 基础路由，后续步骤再进行丰富
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') // 暂时指向 Home.vue，后续修改为具体的布局组件
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import('@/views/user/UserLoginPage.vue')
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: () => import('@/views/user/UserRegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
