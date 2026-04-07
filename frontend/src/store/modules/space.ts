import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpaceStore = defineStore('space', () => {
  // 状态：当前空间信息、空间列表等
  const currentSpace = ref(null)
  const spaceList = ref([])

  // 动作：获取空间列表、切换空间等
  const fetchSpaceList = async () => {}
  const switchSpace = async () => {}

  return {
    currentSpace,
    spaceList,
    fetchSpaceList,
    switchSpace
  }
})
