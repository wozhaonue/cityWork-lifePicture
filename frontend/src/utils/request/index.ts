import axios from 'axios'
import type { AxiosInstance } from 'axios'

// 引入插件
import { setupDedupePlugin } from './plugins/dedupe'
import { setupRetryPlugin } from './plugins/retry'
import { setupAuthPlugin } from './plugins/auth'
import { setupErrorPlugin } from './plugins/error'

// 创建核心 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8123', // 基础路径，由环境变量覆盖
  timeout: 3000, // 为演示超时重试，先将全局超时限制缩短到 3 秒
  withCredentials: true, // 允许跨域请求携带 Cookie
})

// 挂载插件 (拦截器执行顺序很重要)
// 请求拦截器执行顺序为倒序（先挂载的后执行）
// 响应拦截器执行顺序为正序（先挂载的先执行）

// 1. 去重插件：最外层，取消请求，或清理等待队列
setupDedupePlugin(request)

// 2. 重试插件：在遇到超时或网络错误时拦截，重新发起 axios 请求
setupRetryPlugin(request)
 
// 3. 鉴权插件：处理 401 鉴权和路由联动
setupAuthPlugin(request)

// 4. 错误插件：统一抛出业务或网络错误，结合 UI 弹窗
setupErrorPlugin(request)

export default request
