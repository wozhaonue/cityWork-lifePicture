import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePictureStore = defineStore('picture', () => {
  // 状态：图片列表、当前预览图片、上传状态等
  const pictureList = ref([])
  const currentPreview = ref(null)

  // 动作：获取图片列表、上传图片、删除图片等
  const fetchPictureList = async () => {}
  const uploadPicture = async () => {}

  return {
    pictureList,
    currentPreview,
    fetchPictureList,
    uploadPicture
  }
})
