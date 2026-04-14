import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'), // 全局布局组件
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
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
  },
  // 登录注册页通常不需要全局的 Header，保持在顶层
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
