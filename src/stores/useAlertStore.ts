import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { AlertMessage } from '@/types/common'

export const useAlertStore = defineStore('alertStore', () => {
  const openAlertConfig = ({ type, message }: { type: AlertMessage; message: string }) => {
    ElMessage({
      message,
      type,
      showClose: true,
      plain: true,
      duration: 5000,
    })
  }

  return { openAlertConfig }
})
