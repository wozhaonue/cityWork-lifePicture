<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userLoginUsingPost } from '@/api/userController'
import { useUserStore } from '@/store/modules/user'
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  userAccount: '',
  userPassword: ''
})

const rules = reactive<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 20, message: '账号长度在 4 到 20 个字符', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' }
  ]
})

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true

      // 优雅替代方案：使用 .catch 捕获底层的网络异常（并返回 null）
      // 全局拦截器 error.ts 已处理错误弹窗，业务层只需捕获后静默中断即可
      const res = await userLoginUsingPost({
        userAccount: form.userAccount,
        userPassword: form.userPassword
      }).catch(() => null)

      // 如果请求被 dedupe 插件取消（返回了 pending Promise 黑洞），
      // 下方的代码永远不会执行。这意味着 loading 状态会继续保留给【第一次正在请求中】的调用，这是完美的副作用！

      if (!res) {
        loading.value = false // 网络异常时关闭 loading
        return // 异常已被全局处理，业务直接阻断
      }

      loading.value = false // 请求成功到达业务层，关闭 loading

      // 业务逻辑判断
      if (res.data.code === 0) {
        userStore.setUserInfo(res.data.data ?? null)
        ElMessage.success('登录成功')
        router.push('/')
      } else {
        ElMessage.error(res.data.message || '登录失败')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const toRegister = () => {
  router.push('/user/register')
}
</script>

<template>
  <div class="min-h-screen bg-digital-bg flex items-center justify-center p-4 relative overflow-hidden">
    <!-- 极简背景装饰 -->
    <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/20 blur-3xl opacity-50 pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-earth-primary/5 blur-3xl opacity-50 pointer-events-none"></div>

    <div class="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 border border-white/50">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-serif text-gray-900 tracking-wider mb-3">登录 CityWork</h1>
        <p class="text-sm text-gray-500 font-light tracking-wide">欢迎回到数字影像资产管理平台</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        size="large"
      >
        <el-form-item prop="userAccount">
          <el-input
            v-model="form.userAccount"
            placeholder="账号"
            :prefix-icon="User"
            class="rounded-xl!"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="userPassword" class="mt-6 mb-8">
          <el-input
            v-model="form.userPassword"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            class="rounded-xl!"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="w-full rounded-xl! h-12! text-base! tracking-widest font-serif shadow-md hover:shadow-lg transition-all duration-300"
            :loading="loading"
            @click="handleLogin(formRef)"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="mt-8 text-center">
        <span class="text-gray-400 text-sm font-light">还没有账号？</span>
        <el-button link type="primary" class="text-sm! font-light tracking-wide align-baseline!" @click="toRegister">
          立即注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 深度覆盖 Element Plus 样式以符合极简设计 */
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #e5e7eb inset !important; /* gray-200 */
  background-color: #f9fafb !important; /* gray-50 */
  border-radius: 0.75rem !important;
  padding: 0 16px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #d1d5db inset !important; /* gray-300 */
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1.5px var(--el-color-primary) inset !important;
  background-color: #ffffff !important;
}

:deep(.el-input__inner) {
  height: 48px;
  font-weight: 300;
}

:deep(.el-form-item__error) {
  padding-top: 4px;
  font-weight: 300;
  letter-spacing: 0.05em;
}
</style>
