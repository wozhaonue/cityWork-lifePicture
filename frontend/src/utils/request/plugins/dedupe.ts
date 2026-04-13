import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'

// 存储请求的 AbortController 实例，用于取消重复请求
const pendingMap = new Map<string, AbortController>()

/**
 * 生成请求的唯一 key
 */
const getRequestKey = (config: InternalAxiosRequestConfig) => {
  const dataString = typeof config.data === 'string' ? config.data : JSON.stringify(config.data)
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    dataString
  ].join('&')
}

/**
 * 添加请求到等待队列
 */
const addPendingRequest = (config: InternalAxiosRequestConfig) => {
  const key = getRequestKey(config)
  if (pendingMap.has(key)) {
    // 如果已经存在相同的请求，则取消上一个请求 (也可以选择取消当前的，这里选择取消之前的)
    // 根据需求 "防止快速连点"，通常是保留第一个请求，取消后面的重复请求
    // 采用 "忽略后续请求" 的策略：
    const controller = new AbortController()
    config.signal = controller.signal
    controller.abort('重复请求被取消')
    return config
  }
  
  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(key, controller)
  return config
}

/**
 * 从等待队列中移除请求
 */
const removePendingRequest = (config: InternalAxiosRequestConfig) => {
  const key = getRequestKey(config)
  if (pendingMap.has(key)) {
    pendingMap.delete(key)
  }
}

/**
 * 核心：请求去重插件
 */
export const setupDedupePlugin = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 通过自定义配置 `dedupe` 允许某些请求跳过去重，默认开启去重
      // const isDedupeEnabled = (config as any).dedupe !== false
      // if (isDedupeEnabled) {
        config = addPendingRequest(config)
      // }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      removePendingRequest(response.config as InternalAxiosRequestConfig)
      return response
    },
    (error: AxiosError) => {
      if (error.config) {
        removePendingRequest(error.config as InternalAxiosRequestConfig)
      }
      return Promise.reject(error)
    }
  )
}
