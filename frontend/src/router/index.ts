import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

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
        component: () => import('@/views/space/PersonalSpacePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/space/team',
        name: 'TeamSpace',
        component: () => import('@/views/space/TeamSpacePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/gallery/public',
        name: 'PublicGallery',
        component: () => import('@/views/gallery/PublicGalleryPage.vue')
      },
      {
        path: '/admin',
        name: 'AdminCenter',
        component: () => import('@/views/admin/AdminCenterPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
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

// 路由守卫鉴权
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLogin = !!userStore.userInfo
  const isAdmin = userStore.userInfo?.userRole === 'admin'

  // 1. 需要登录的页面
  if (to.meta.requiresAuth && !isLogin) {
    next({
      path: '/user/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // 2. 需要管理员权限的页面
  if (to.meta.requiresAdmin && !isAdmin) {
    next('/')
    return
  }

  // 3. 已登录用户不能访问登录/注册页
  if ((to.path === '/user/login' || to.path === '/user/register') && isLogin) {
    next('/')
    return
  }

  next()
})

export default router
