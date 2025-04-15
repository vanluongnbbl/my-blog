import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import { useMutation } from '@tanstack/vue-query'

const resetPassword = (data: { password: string; passwordConfirm: string }) => {
  return http.post('/reset-forget-password', {
    data,
  })
}

type UseResetPasswordOptions = {
  config?: MutationConfig<typeof resetPassword>
}

export const useResetPassword = ({ config }: UseResetPasswordOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: resetPassword,
  })
}
