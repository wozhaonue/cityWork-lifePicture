import type { Directive, DirectiveBinding } from 'vue'

/**
 * 兜底图片 (Data URI)
 * 在图片加载完全失败（重试耗尽）时显示的默认占位图
 */
const DEFAULT_FALLBACK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23999">Image Load Failed</text></svg>'

/**
 * 扩展 HTMLImageElement 类型以保存内部状态
 */
interface ImageProElement extends HTMLImageElement {
  _retryCount?: number
  _observer?: IntersectionObserver
}

/**
 * v-image-pro 自定义指令
 * 实现图片懒加载、异步解码、错误重试与兜底替换
 */
const imageProDirective: Directive<ImageProElement, string> = {
  mounted(el: ImageProElement, binding: DirectiveBinding<string>) {
    const targetSrc = binding.value

    // 1. 提升渲染性能：使用异步解码，避免阻塞主线程
    el.setAttribute('decoding', 'async')

    // 2. 初始化重试次数
    el._retryCount = 0

    // 3. 错误重试与兜底逻辑
    el.onerror = () => {
      const maxRetries = 3
      if (el._retryCount !== undefined && el._retryCount < maxRetries) {
        el._retryCount++
        console.warn(`[v-image-pro] 图片加载失败，正在进行第 ${el._retryCount} 次重试: ${targetSrc}`)
        
        // 延迟 1 秒后重试，并在 URL 后追加时间戳以规避浏览器强缓存导致的重复失败
        setTimeout(() => {
          const separator = targetSrc.includes('?') ? '&' : '?'
          el.src = `${targetSrc}${separator}_retry=${Date.now()}`
        }, 1000)
      } else {
        console.error(`[v-image-pro] 图片加载失败，已达到最大重试次数，显示兜底图: ${targetSrc}`)
        el.src = DEFAULT_FALLBACK
        // 清除 onerror 处理函数，防止兜底图加载失败导致无限循环
        el.onerror = null
      }
    }

    // 4. 使用 IntersectionObserver 实现懒加载
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 图片进入可视区，赋予真实的 src 属性触发加载
            el.src = targetSrc
            // 触发后立即停止观察该元素
            observer.unobserve(el)
          }
        })
      },
      {
        rootMargin: '100px 0px', // 提前 100px 开始加载
        threshold: 0.01 // 只要有 1% 露头就触发
      }
    )

    el._observer = observer
    observer.observe(el)
  },

  unmounted(el: ImageProElement) {
    // 元素卸载时清理 Observer，防止内存泄漏
    if (el._observer) {
      el._observer.disconnect()
      delete el._observer
    }
    // 移除事件监听
    el.onerror = null
  }
}

export default imageProDirective
