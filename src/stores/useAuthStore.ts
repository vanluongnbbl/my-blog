import { useRouter } from 'vue-router'
import type { TAuth } from '@/types/type'
import { PATHS } from '@/utils/constants'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryClient } from '@/libs/vue-query'
import { USER_PROFILE_KEY } from '@/api/auth/useUserProfile'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const auth = ref<TAuth | undefined>(undefined)
  const setAuth = (newAuth: TAuth | undefined) => {
    auth.value = newAuth
  }

  const clearAuth = () => {
    localStorage.clear()
    setAuth(undefined)
    queryClient.setQueryData([USER_PROFILE_KEY], null)
    router.push(PATHS.LOGIN)
  }
  return { auth, setAuth, clearAuth }
})
