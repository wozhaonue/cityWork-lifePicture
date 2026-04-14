import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLoginUserUsingGet } from '@/api/userController';

export const useUserStore = defineStore('user', () => {
  // 状态：用户个人信息（不应包括权限信息）
  const userInfo = ref<API.LoginUserVO | null>(null);
  // setter: 设置用户个人信息
  const setUserInfo = (info: API.LoginUserVO | null) => {
    userInfo.value = info;
  }
  // 远程抓取数据fetchUserInfo
  const fetchUserInfo = async () => {
    const res = await getLoginUserUsingGet();
    if(res.data.code === 0){
      setUserInfo(res.data.data || null);
    }
  }

  return {
    userInfo,
    setUserInfo,
    fetchUserInfo
  }
}, {
  persist: true
})
