import type { AxiosInstance, AxiosError } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 核心：全局错误处理插件
 */
export const setupErrorPlugin = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => {
      // 成功响应的业务拦截（假设后端返回 { code, data, message }）
      const res = response.data
      console.log('[Error Plugin] 拦截器接收成功响应:', res)
      
      // 如果需要拦截业务层的非零 code（比如 code !== 0 表示业务错误），可以在此处扩展
      // if (res.code !== 0) { ... throw new Error() ... }
      
      return res
    },
    (error: AxiosError) => {
      console.error('[Error Plugin] 拦截器捕获异常:', error)
      
      // 忽略被 Dedupe Plugin 取消的请求错误
      if (axios.isCancel(error)) {
        console.log('[Error Plugin] 忽略取消的请求:', error.message)
        return Promise.reject(error)
      }

      let errorMessage = '网络请求失败，请稍后重试'

      if (error.response) {
        // 请求发出，但状态码非 2xx
        switch (error.response.status) {
          case 400:
            errorMessage = '请求参数错误 (400)'
            break
          case 401:
            // 401 已在 Auth Plugin 中处理并弹出了对应提示，所以这里不再重复弹窗
            return Promise.reject(error)
          case 403:
            errorMessage = '拒绝访问 (403)'
            break
          case 404:
            errorMessage = '请求的接口不存在 (404)'
            break
          case 500:
            errorMessage = '服务器内部错误 (500)'
            break
          default:
            errorMessage = `请求错误 (${error.response.status})`
        }
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        // 请求超时
        errorMessage = '请求超时，请检查网络后重试'
      } else if (error.message.includes('Network Error')) {
        errorMessage = '网络连接异常或服务器无响应'
      } else {
        errorMessage = error.message
      }

      // 结合 Element Plus 统一弹出错误提示
      ElMessage({
        message: errorMessage,
        type: 'error',
        duration: 3000,
      })

      return Promise.reject(error)
    }
  )
}
