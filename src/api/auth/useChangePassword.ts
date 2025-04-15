import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import { useMutation } from '@tanstack/vue-query'

const changePassword = (data: { password: string; passwordConfirm: string }) => {
  return http.post('/change-password', {
    data,
  })
}

type UseChangePasswordOptions = {
  config?: MutationConfig<typeof changePassword>
}

export const useChangePassword = ({ config }: UseChangePasswordOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: changePassword,
  })
}
