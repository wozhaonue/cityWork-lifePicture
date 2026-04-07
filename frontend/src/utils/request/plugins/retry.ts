import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

// 扩展 Axios 配置项，增加重试相关字段
export interface CustomRetryAxiosConfig extends InternalAxiosRequestConfig {
  _retryCount?: number
  retryLimit?: number
  retryDelay?: number
}

/**
 * 核心：超时重试机制插件
 */
export const setupRetryPlugin = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    undefined, // 仅处理异常响应
    async (error: AxiosError) => {
      const config = error.config as CustomRetryAxiosConfig
      if (!config) {
        return Promise.reject(error)
      }

      // 默认重试配置：限制 3 次，间隔 1000ms
      const retryLimit = config.retryLimit ?? 3
      const retryDelay = config.retryDelay ?? 1000
      config._retryCount = config._retryCount ?? 0

      // 判断是否需要重试：仅在超时或者网络错误（非服务器返回状态码）时进行重试
      // 例如 code: 'ECONNABORTED' (axios Timeout) 或者 网络断开 (Network Error)
      const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout')
      const isNetworkError = error.message.includes('Network Error')

      if ((isTimeout || isNetworkError) && config._retryCount < retryLimit) {
        config._retryCount += 1
        console.log(`[Retry Plugin] 请求超时或失败，正在进行第 ${config._retryCount} 次重试...`)
        
        // 创建一个延迟 Promise
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        
        // 重新发起请求，复用现有的 axios 实例
        return instance(config)
      }

      return Promise.reject(error)
    }
  )
}
