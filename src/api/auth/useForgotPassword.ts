import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import type { ForgotPasswordDTO } from '@/validators/forgotPasswordSchema'
import { useMutation } from '@tanstack/vue-query'

const requestForgotPassword = (data: ForgotPasswordDTO) => {
  return http.post('/request-forget-password', {
    data,
  })
}

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof requestForgotPassword>
}

export const useForgotPassword = ({ config }: UseForgotPasswordOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: requestForgotPassword,
  })
}
