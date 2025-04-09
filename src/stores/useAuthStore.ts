import { useRouter } from 'vue-router'
import type { TAuth } from '@/types/type'
import { PATHS } from '@/utils/constants'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const auth = ref<TAuth | undefined>(undefined)
  const setAuth = (newAuth: TAuth | undefined) => {
    auth.value = newAuth
  }

  const clearAuth = () => {
    localStorage.clear()
    setAuth(undefined)
    // queryClient.setQueryData([USER_PROFILE_KEY], null)
    router.push(PATHS.LOGIN)
  }
  return { auth, setAuth, clearAuth }
})
