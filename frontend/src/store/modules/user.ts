import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态：用户信息、登录状态等
  const userInfo = ref(null)

  // 动作：登录、登出、获取用户信息等
  const login = async () => {}
  const logout = async () => {}

  return {
    userInfo,
    login,
    logout
  }
})
