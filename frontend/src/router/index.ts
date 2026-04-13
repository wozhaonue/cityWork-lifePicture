import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // 基础路由，后续步骤再进行丰富
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') // 暂时指向 Home.vue，后续步骤 3.4 修改为全局布局组件
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
  },
  {
    path: '/space/personal',
    name: 'PersonalSpace',
    component: () => import('@/views/space/PersonalSpacePage.vue')
  },
  {
    path: '/space/team',
    name: 'TeamSpace',
    component: () => import('@/views/space/TeamSpacePage.vue')
  },
  {
    path: '/gallery/public',
    name: 'PublicGallery',
    component: () => import('@/views/gallery/PublicGalleryPage.vue')
  },
  {
    path: '/admin',
    name: 'AdminCenter',
    component: () => import('@/views/admin/AdminCenterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
