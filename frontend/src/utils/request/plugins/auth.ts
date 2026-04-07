import type { AxiosInstance, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 核心：身份鉴权插件 (Session-Cookie机制)
 */
export const setupAuthPlugin = (instance: AxiosInstance) => {
  // 请求拦截器中不需要注入 Token，因为 axios.create() 已配置了 withCredentials: true
  // 响应拦截器：处理 401 未登录/登录过期 状态码
  instance.interceptors.response.use(
    undefined,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        // 弹出提示
        ElMessage({
          message: '未登录或登录已过期，请重新登录',
          type: 'warning',
          duration: 3000,
        })
        
        // 此处预留与 Vue Router 的联动，强制重定向至登录页
        // 例如：
        // import router from '@/router'
        // router.push('/user/login')
        console.warn('[Auth Plugin] 未登录状态，已拦截请求，触发路由跳转 /user/login')
      }
      return Promise.reject(error)
    }
  )
}
