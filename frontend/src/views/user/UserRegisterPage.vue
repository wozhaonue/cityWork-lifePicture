<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, View, EditPen } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.userPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 20, message: '账号长度在 4 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' }
  ],
  checkPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ]
})

const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      // 模拟注册请求
      setTimeout(() => {
        loading.value = false
        // router.push('/user/login')
      }, 1000)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const toLogin = () => {
  router.push('/user/login')
}
</script>

<template>
  <div class="min-h-screen bg-digital-bg flex items-center justify-center p-4 relative overflow-hidden">
    <!-- 极简背景装饰 -->
    <div class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/20 blur-3xl opacity-50 pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-earth-primary/5 blur-3xl opacity-50 pointer-events-none"></div>

    <div class="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 border border-white/50">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-serif text-gray-900 tracking-wider mb-3">注册账号</h1>
        <p class="text-sm text-gray-500 font-light tracking-wide">加入 CityWork 探索无限影像</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="register-form"
        size="large"
      >
        <el-form-item prop="userAccount">
          <el-input
            v-model="form.userAccount"
            placeholder="设置账号 (字母、数字、下划线)"
            :prefix-icon="User"
            class="rounded-xl!"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="userPassword" class="mt-6">
          <el-input
            v-model="form.userPassword"
            type="password"
            placeholder="设置密码 (至少 8 位)"
            :prefix-icon="Lock"
            show-password
            class="rounded-xl!"
          />
        </el-form-item>

        <el-form-item prop="checkPassword" class="mt-6 mb-8">
          <el-input
            v-model="form.checkPassword"
            type="password"
            placeholder="确认密码"
            :prefix-icon="View"
            show-password
            class="rounded-xl!"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="w-full !rounded-xl !h-12 !text-base tracking-widest font-serif shadow-md hover:shadow-lg transition-all duration-300"
            :loading="loading"
            @click="handleRegister(formRef)"
          >
            立即注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="mt-8 text-center">
        <span class="text-gray-400 text-sm font-light">已有账号？</span>
        <el-button link type="primary" class="text-sm! font-light tracking-wide align-baseline!" @click="toLogin">
          立即登录
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
