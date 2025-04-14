import { http } from '@/libs/http.ts'
import type { MutationConfig } from '@/libs/vue-query'
import type { RegisterDTO } from '@/validators/registerSchema'
import { useMutation } from '@tanstack/vue-query'

const register = (data: { username: string; email: string; password: string }) => {
  return http.post('/register', {
    data,
  })
}

type UseRegisterOptions = {
  config?: MutationConfig<typeof register>
}

export const useRegister = ({ config }: UseRegisterOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: register,
  })
}
