import { createApp } from 'vue'
import '@fontsource/noto-serif-sc/400.css' // 引入本地 Noto Serif SC 字体 (常规体)
import '@fontsource/noto-serif-sc/700.css' // 引入本地 Noto Serif SC 字体 (粗体)
import './assets/styles/main.css' // 引入 Tailwind CSS 和全局样式
import 'element-plus/theme-chalk/el-message.css' // 确保 ElMessage 的样式被正确加载
import './assets/styles/element-theme.css' // 引入 Element Plus 全局主题覆盖变量
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(directives)

app.mount('#app')
