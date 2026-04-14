import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {LoginUserVO} from '@/api/typ'
import { getLoginUserUsingGet } from '@/api/userController';

export const useUserStore = defineStore('user', () => {
  // 状态：用户个人信息（不应包括权限信息）
  const userInfo = ref<LoginUserVO | null>(null);
  // setter: 设置用户个人信息
  const setUserInfo = (info: LoginUserVO | null) => {
    userInfo.value = info;
  }
  // 远程抓取数据fetchUserInfo
  const fetchUserInfo = async () => {
    const res = await getLoginUserUsingGet();
    if(res.data.code === 0){
      setUserInfo(res.data.data);
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
