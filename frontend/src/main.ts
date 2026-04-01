import { createApp } from 'vue'
import '@fontsource/noto-serif-sc/400.css' // 引入本地 Noto Serif SC 字体 (常规体)
import '@fontsource/noto-serif-sc/700.css' // 引入本地 Noto Serif SC 字体 (粗体)
import './assets/styles/main.css' // 引入 Tailwind CSS 和全局样式
import './assets/styles/element-theme.css' // 引入 Element Plus 全局主题覆盖变量
import App from './App.vue'

createApp(App).mount('#app')
