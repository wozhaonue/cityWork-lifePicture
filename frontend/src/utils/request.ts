import axios from 'axios'
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css' // 引入 ElMessage 的样式，修复在 TS 中调用无样式的问题

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 基础路径，可由环境变量覆盖
  timeout: 10000, // 10秒超时限制
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 注入 Token（目前暂用假数据模拟，后续从状态管理或本地存储中获取真实Token）
    const token = localStorage.getItem('token') || 'mock-token-123456'
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('请求拦截器resolve发出');
    
    return config
  },
  (error: AxiosError) => {
    console.log('请求拦截器reject发出');
    console.log(error);
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 获取后端返回的数据结构
    const res = response.data
    
    // 此处可根据后端约定的业务状态码进行全局处理
    // 假设业务代码 code 不为 0 时表示业务逻辑错误（根据实际项目约定调整）
    // 暂不拦截业务状态，直接返回 data 以便调用方处理
    console.log('响应拦截器resolve发出');
    console.log(res);
    return res
  },
  (error: AxiosError) => {
    console.log('响应拦截器reject发出');
    console.log(error);
    let errorMessage = '网络请求失败，请稍后重试'

    if (error.response) {
      // 请求已发出，服务器返回非 2xx 状态码
      switch (error.response.status) {
        case 400:
          errorMessage = '请求参数错误 (400)'
          break
        case 401:
          errorMessage = '未授权，请重新登录 (401)'
          // 可以在此处添加登出逻辑并跳转到登录页
          break
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
    } else if (error.request) {
      // 请求已发出，但没有收到响应（如断网、跨域预检失败等）
      errorMessage = '网络连接异常或服务器无响应'
    } else {
      // 客户端发送请求时发生错误
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

export default request
